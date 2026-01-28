import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (isConfigured) {
  console.log('%c[Supabase] Connected', 'color:green;font-weight:bold');
} else {
  console.log('%c[Supabase] Disabled (No ENV)', 'color:orange;font-weight:bold');
}
