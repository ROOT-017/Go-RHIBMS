import { CreateStudentDTO } from "../@types";
import { supabase } from "../lib/supabaseClient";

export const studentService = {
  async checkMatriculeAvailability(matricule: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('students')
      .select('matricule')
      .eq('matricule', matricule)
      .single();

    if (error && error.code === 'PGRST116') {
      return true; // Matricule is available
    }

    return !data; // Return true if no data found
  },

  async createStudent(studentData: CreateStudentDTO) {
    try {
      // 1. Create auth user using admin API
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: studentData.email,
          password: studentData.password,
          email_confirm: true, // Auto-confirm email
          user_metadata: {
            full_name: studentData.full_name,
            role: 'student',
          },
        });

      if (authError) {
        console.error('Auth creation error:', authError);
        throw new Error(`Failed to create user: ${authError.message}`);
      }

      if (!authData.user) {
        throw new Error('User creation failed - no user returned');
      }

      const userId = authData.user.id;

      // 2. Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        full_name: studentData.full_name,
        email: studentData.email,
        role: 'student',
      });

      if (profileError) {
        // Cleanup: Delete the auth user if profile creation fails
        await supabase.auth.admin.deleteUser(userId);
        console.error('Profile creation error:', profileError);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      // 3. Create student record
      const { data: studentRecord, error: studentError } = await supabase
        .from('students')
        .insert({
          profile_id: userId,
          matricule: studentData.matricule,
          date_of_birth: studentData.date_of_birth || null,
          gender: studentData.gender || null,
          program_id: studentData.program_id,
          level: studentData.level,
          admission_year:
            studentData.admission_year || new Date().getFullYear(),
          current_semester: studentData.current_semester || 1,
          total_fee: studentData.total_fee || 0,
          fee_balance: studentData.total_fee || 0,
          fee_status: 'unpaid',
        })
        .select(
          `
          *,
          profile:profiles(*),
          program:programs(*)
        `,
        )
        .single();

      if (studentError) {
        // Cleanup: Delete profile and auth user
        await supabase.from('profiles').delete().eq('id', userId);
        await supabase.auth.admin.deleteUser(userId);
        console.error('Student creation error:', studentError);
        throw new Error(
          `Failed to create student record: ${studentError.message}`,
        );
      }

      // 4. Create fee record for current academic year
      const { data: activeYear } = await supabase
        .from('academic_years')
        .select('year')
        .eq('is_active', true)
        .single();

      if (activeYear) {
        await supabase.from('fees').insert({
          student_id: studentRecord.id,
          academic_year: activeYear.year,
          amount: studentData.total_fee || 0,
          status: 'unpaid',
        });
      }

      console.log('Student created successfully:', studentRecord);

      return {
        success: true,
        student: studentRecord,
        credentials: {
          matricule: studentData.matricule,
          email: studentData.email,
          password: studentData.password,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Student creation error:', error);
      throw error;
    }
  },

  async sendWelcomeEmail(email: string, matricule: string, password: string) {
    // Implement your email service here
    // This could be Supabase Edge Functions, Resend, SendGrid, etc.
    console.log('Send welcome email to:', email);
    console.log('Credentials - Matricule:', matricule, 'Password:', password);

    // Example using fetch to an API route
    /*
    const response = await fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Welcome to Our School Information System',
        matricule,
        password,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send welcome email');
    }
    */
  },
};
