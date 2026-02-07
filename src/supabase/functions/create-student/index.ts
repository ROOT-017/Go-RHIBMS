// supabase/functions/create-student/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { studentData } = await req.json()
    
    // Get the auth token from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify the calling user is an admin
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid token')
    }

    // Check admin role
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      throw new Error('Only admins can create students')
    }

    // Create auth user using admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: studentData.email,
      password: studentData.password,
      email_confirm: true,
      user_metadata: {
        full_name: studentData.full_name,
        role: 'student',
      },
    })

    if (authError) throw authError

    const userId = authData.user.id

    // Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        full_name: studentData.full_name,
        email: studentData.email,
        role: 'student',
      })

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(userId)
      throw profileError
    }

    // Create student record
    const { data: studentRecord, error: studentError } = await supabaseAdmin
      .from('students')
      .insert({
        profile_id: userId,
        matricule: studentData.matricule.trim().toUpperCase(),
        date_of_birth: studentData.date_of_birth,
        gender: studentData.gender,
        program_id: studentData.program_id,
        level: studentData.level,
        admission_year: studentData.admission_year,
        current_semester: studentData.current_semester || 1,
        total_fee: studentData.total_fee || 0,
        fee_balance: studentData.total_fee || 0,
        fee_status: 'unpaid',
      })
      .select(`
        *,
        profile:profiles(*),
        program:programs(*, department:departments(*))
      `)
      .single()

    if (studentError) {
      await supabaseAdmin.from('profiles').delete().eq('id', userId)
      await supabaseAdmin.auth.admin.deleteUser(userId)
      throw studentError
    }

    // Create fee record
    if (studentData.total_fee && studentData.total_fee > 0) {
      const { data: activeYear } = await supabaseAdmin
        .from('academic_years')
        .select('year')
        .eq('is_active', true)
        .maybeSingle()

      if (activeYear) {
        await supabaseAdmin.from('fees').insert({
          student_id: studentRecord.id,
          academic_year: activeYear.year,
          amount: studentData.total_fee,
          status: 'unpaid',
        })
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        student: studentRecord,
        credentials: {
          matricule: studentData.matricule.trim().toUpperCase(),
          email: studentData.email,
          password: studentData.password,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})