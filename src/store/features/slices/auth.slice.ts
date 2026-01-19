import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Session, User } from '@supabase/supabase-js';
import { Profile, Student, Admin, StudentLoginData } from '../../../@types'; // Updated import
import { supabase } from '../../../lib/supabaseClient';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  student: Student | null; 
  admin: Admin | null; 
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  student: null,
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Helper to get student by matricule (for login)
const getStudentByMatricule = async (matricule: string) => {
  const { data, error } = await supabase
    .from('students')
    .select(
      `
      *,
      profile:profiles(*),
      program:programs(*)
    `,
    )
    .eq('matricule', matricule)
    .single();

  return { data, error };
};

// Helper to get admin by profile ID
const getAdminByProfileId = async (profileId: string) => {
  const { data, error } = await supabase
    .from('admins')
    .select('*, profile:profiles(*)')
    .eq('profile_id', profileId)
    .single();

  return { data, error };
};

// ==================== THUNKS ====================

// Login for ADMIN (using email/password)
export const loginAdmin = createAsyncThunk<
  {
    user: User;
    session: Session;
    profile: Profile;
    admin: Admin | null;
  },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginAdmin', async ({ email, password }, { rejectWithValue }) => {
  // 1️⃣ Authenticate
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user || !data.session) {
    return rejectWithValue(error?.message || 'Login failed');
  }

  // 2️⃣ Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single<Profile>();

  if (profileError || !profile) {
    return rejectWithValue('Profile not found');
  }

  // 3️⃣ Check if user is admin
  let admin = null;
  if (profile.role === 'admin') {
    const { data: adminData } = await getAdminByProfileId(profile.id);
    admin = adminData;
  }

  return {
    user: data.user,
    session: data.session,
    profile,
    admin,
  };
});

export const loginStudent = createAsyncThunk<
  {
    user: User;
    session: Session;
    profile: Profile;
    student: Student | null;
  },
  { matricule: string; password: string },
  { rejectValue: string }
>('auth/loginStudent', async ({ matricule, password }, { rejectWithValue }) => {
  try {
    // 1. Use RPC function to find student (bypasses RLS)
    const { data: loginData, error: findError } = (await supabase
      .rpc('find_student_for_login', {
        p_matricule: matricule.trim().toUpperCase(),
      })
      .single()) as { data: StudentLoginData | null; error: string | null };

    if (findError || !loginData) {
      return rejectWithValue('Student not found');
    }

    // 2. Login with the email
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: loginData.profile_email,
        password,
      });

    if (authError) {
      return rejectWithValue(authError.message);
    }

    // 3. Now get full student data (RLS will allow since user is authenticated)
    const { data: fullStudent } = await supabase
      .from('students')
      .select('*, program:programs(*)')
      .eq('id', loginData.student_id)
      .single();

    // 4. Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', loginData.profile_id)
      .single();

    return {
      user: authData.user!,
      session: authData.session!,
      profile: profile!,
      student: fullStudent,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    return rejectWithValue(error.message || 'Login failed');
  }
});


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return rejectWithValue(error.message || 'Logout failed');
      }

      // Success - no return value needed
      return;
      // eslint-disable-next-line
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  },
);

// Generic login that tries both student and admin
export const loginUser = createAsyncThunk<
  {
    user: User;
    session: Session;
    profile: Profile;
    student: Student | null;
    admin: Admin | null;
  },
  { identifier: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ identifier, password }, { rejectWithValue }) => {
  // Try to determine if identifier is email or matricule
  const isEmail = identifier.includes('@');

  if (isEmail) {
    // Try admin login (email)
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });

    if (authError) {
      return rejectWithValue(authError.message || 'Login failed');
    }

    if (!authData.user || !authData.session) {
      return rejectWithValue('Login failed');
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single<Profile>();

    if (profileError || !profile) {
      return rejectWithValue('Profile not found');
    }

    // Get role-specific data
    let student = null;
    let admin = null;

    if (profile.role === 'student') {
      const { data: studentData } = await supabase
        .from('students')
        .select('*, profile:profiles(*), program:programs(*)')
        .eq('profile_id', profile.id)
        .single();
      student = studentData;
    } else if (profile.role === 'admin') {
      const { data: adminData } = await getAdminByProfileId(profile.id);
      admin = adminData;
    }

    return {
      user: authData.user,
      session: authData.session,
      profile,
      student,
      admin,
    };
  } else {
    // Try student login (matricule) - DIRECT IMPLEMENTATION
    // 1️⃣ First, get student by matricule to get their email
    const { data: studentData, error: studentError } =
      await getStudentByMatricule(identifier);

    if (studentError || !studentData) {
      return rejectWithValue('Student not found');
    }

    // 2️⃣ Get the student's email from their profile
    const studentEmail = studentData.profile?.email;
    if (!studentEmail) {
      return rejectWithValue('Student email not found');
    }

    // 3️⃣ Authenticate with email/password
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: studentEmail,
        password,
      });

    if (authError || !authData.user || !authData.session) {
      return rejectWithValue(authError?.message || 'Login failed');
    }

    // 4️⃣ Fetch profile (should match the one we already have)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single<Profile>();

    if (profileError || !profile) {
      return rejectWithValue('Profile not found');
    }

    return {
      user: authData.user,
      session: authData.session,
      profile,
      student: studentData,
      admin: null,
    };
  }
});

export const restoreSession = createAsyncThunk<
  {
    user: User;
    session: Session;
    profile: Profile;
    student: Student | null;
    admin: Admin | null;
  },
  void,
  { rejectValue: string }
>('auth/restoreSession', async (_, { rejectWithValue }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return rejectWithValue('No active session');
  }

  // Get profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single<Profile>();

  if (profileError || !profile) {
    return rejectWithValue('Profile not found');
  }

  // Get role-specific data
  let student = null;
  let admin = null;

  if (profile.role === 'student') {
    const { data: studentData } = await supabase
      .from('students')
      .select('*, profile:profiles(*), program:programs(*)')
      .eq('profile_id', profile.id)
      .single();
    student = studentData;
  } else if (profile.role === 'admin') {
    const { data: adminData } = await getAdminByProfileId(profile.id);
    admin = adminData;
  }

  return {
    user: session.user,
    session,
    profile,
    student,
    admin,
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      supabase.auth.signOut();
      state.user = null;
      state.profile = null;
      state.session = null;
      state.student = null;
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.profile = null;
        state.session = null;
        state.student = null;
        state.admin = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
        // Still clear auth state on failed logout attempt
        state.user = null;
        state.profile = null;
        state.session = null;
        state.student = null;
        state.admin = null;
        state.isAuthenticated = false;
      })
      // LOGIN USER (generic)
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.student = action.payload.student;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Login failed';
      })

      // LOGIN STUDENT
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.student = action.payload.student;
        state.isAuthenticated = true;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })

      // LOGIN ADMIN
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })

      // RESTORE SESSION
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.student = action.payload.student;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
