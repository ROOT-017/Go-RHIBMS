import { Course, FiltersType } from "../@types";
import { supabase } from "../lib/supabaseClient";

export const courseService = {
  async getAllCourses(filters?: Partial<FiltersType>) {
    let query = supabase
      .from('courses')
      .select(`
        *,
        program:programs(name),
        department:departments(name)
      `);

    // Filtering
    if (filters?.department) {
      query = query.eq('department_id', filters.department);
    }
    if (filters?.program) {
      query = query.eq('program_id', filters.program);
    }
    if (filters?.searchTerm) {
      const s = `%${filters.searchTerm}%`;
      // Search by Course Code or Title
      query = query.or(`code.ilike.${s},title.ilike.${s}`);
    }

    const { data, error } = await query;
    if (error) throw error;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((course: any) => ({
      key: course.id,
      id: course.id,
      code: course.code,
      title: course.title,
      credit: course.credit,
      semester: course.semester,
      program: course.program?.name || 'N/A',
      department: course.department?.name || 'N/A',
      level: course.program_level?.toUpperCase(),
    }));
  },
  async createCourse(courseData: Omit<Course, 'id'>) {
    const { data, error } = await supabase
      .from('courses')
      .insert([{
        code: courseData.code.toUpperCase(),
        title: courseData.title,
        credit: Number(courseData.description),
        semester: Number(courseData.semester),
        department_id: courseData.department_id,
        program_id: courseData.program_id,
        program_level: courseData.program_level,
        description: courseData.description
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};