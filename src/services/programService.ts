import { supabase } from '../lib/supabaseClient';

export const programService = {
  async getAllPrograms() {
    const { data, error } = await supabase
      .from('programs')
      .select('*, department:departments(*, school:schools(*))')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getProgramById(id: string) {
    const { data, error } = await supabase
      .from('programs')
      .select('*, department:departments(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
};