import { createClient } from '@supabase/supabase-js';

// Helper untuk membaca Env Variable dengan aman di Vite
const getEnv = (key: string) => {
  // @ts-ignore
  return import.meta.env[key];
};

const envUrl = getEnv('VITE_SUPABASE_URL');
const envKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Cek apakah user sudah memasukkan URL project sendiri (bukan placeholder)
const isCustomConfig = envUrl && envUrl.length > 0 && !envUrl.includes('your-project-url');

// Pilih konfigurasi: Custom (Vercel) atau Fallback (Demo)
const supabaseUrl = isCustomConfig ? envUrl : FALLBACK_URL;
const supabaseAnonKey = isCustomConfig ? envKey : FALLBACK_KEY;

// Logging status koneksi untuk mempermudah debugging di Console Browser
if (isCustomConfig) {
  console.log("%c[Supabase] Menggunakan Database Pribadi (Custom Config)", "color: #10B981; font-weight: bold;");
} else {
  console.log("%c[Supabase] Environment Variable belum terdeteksi. Menggunakan Mode DEMO.", "color: #F59E0B; font-weight: bold;");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export status konfigurasi untuk dipakai di komponen lain
export const isConfigured = isCustomConfig;
