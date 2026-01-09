import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Session, User } from '@supabase/supabase-js';
import { Profile } from '../../../@types';
import { supabase } from '../../../lib/supabaseClient';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};


export const loginUser = createAsyncThunk<
  { user: User; session: Session; profile: Profile },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
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

  return {
    user: data.user,
    session: data.session,
    profile,
  };
});

export const restoreSession = createAsyncThunk<
  { user: User; session: Session; profile: Profile },
  void,
  { rejectValue: string }
>('auth/restoreSession', async (_, { rejectWithValue }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return rejectWithValue('No active session');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single<Profile>();

  if (error || !profile) {
    return rejectWithValue('Profile not found');
  }

  return {
    user: session.user,
    session,
    profile,
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
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })

      // RESTORE SESSION
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.profile = action.payload.profile;
        state.isAuthenticated = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
