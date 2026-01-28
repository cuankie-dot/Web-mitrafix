import { createClient } from '@supabase/supabase-js';

// Access import.meta.env safely by casting to any to avoid TS errors
const env = (import.meta as any).env;

let supabaseUrl = env?.VITE_SUPABASE_URL;
let supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY;

// Validasi: Jika URL masih default/placeholder, anggap tidak ada
if (supabaseUrl && supabaseUrl.includes('your-project-url')) {
  console.warn('Supabase URL di .env masih default. Menggunakan konfigurasi fallback/demo.');
  supabaseUrl = null;
  supabaseAnonKey = null;
}

// Fallback configuration (Demo Project)
// Jika Anda ingin menggunakan project sendiri, pastikan .env diisi dengan benar
const FALLBACK_URL = 'https://qjiiprxmfyhproewwyvm.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaWlwcnhtZnlocHJvZXd3eXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NzQyMDEsImV4cCI6MjA4NTE1MDIwMX0.NXePku-CHtv_tmR_s2eHRd61LeNnA6ZDQNqdE7fyjxg';

export const supabase = createClient(
  supabaseUrl || FALLBACK_URL,
  supabaseAnonKey || FALLBACK_KEY
);

// Helper untuk mengecek apakah Supabase sudah dikonfigurasi dengan benar
export const isSupabaseConfigured = () => {
  return supabaseUrl && !supabaseUrl.includes('your-project-url');
};
