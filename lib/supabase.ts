import { createClient } from '@supabase/supabase-js';

// Access import.meta.env safely by casting to any to avoid TS errors
const env = (import.meta as any).env;

const supabaseUrl = env?.VITE_SUPABASE_URL;
const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL atau Key belum diset di file .env. Menggunakan mode offline/fallback.');
}

export const supabase = createClient(
  supabaseUrl || 'https://qjiiprxmfyhproewwyvm.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaWlwcnhtZnlocHJvZXd3eXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NzQyMDEsImV4cCI6MjA4NTE1MDIwMX0.NXePku-CHtv_tmR_s2eHRd61LeNnA6ZDQNqdE7fyjxg'
);