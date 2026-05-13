import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'mock-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'mock-service-key';

// Client for public/anon operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin/service operations (bypasses RLS)
// ONLY use this in server-side secure API routes, NEVER expose to client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
