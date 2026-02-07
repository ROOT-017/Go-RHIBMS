import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Regular client for normal operations (uses user's auth token)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Admin client for admin operations (uses service role key)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,    
  },
});

// Optional: Check if service key exists in development
if (import.meta.env.DEV && !SUPABASE_SERVICE_KEY) {
  console.warn(
    '⚠️  VITE_SUPABASE_SERVICE_ROLE_KEY is not set in .env file.\n' +
    'Admin features that require creating users will not work.\n' +
    'Get your service role key from: Supabase Dashboard → Project Settings → API'
  );
}