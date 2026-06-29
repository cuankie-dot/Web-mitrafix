import { createClient } from '@supabase/supabase-js';

// Kredensial diinjeksikan saat build oleh vite.config.ts dari environment variables resmi.
// TIDAK ADA kredensial yang di-hardcode di source code (lihat vite.config.ts).
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

const supabaseUrl = typeof __SUPABASE_URL__ !== 'undefined' ? __SUPABASE_URL__ : '';
const supabaseAnonKey = typeof __SUPABASE_ANON_KEY__ !== 'undefined' ? __SUPABASE_ANON_KEY__ : '';

export const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn(
    '%c[Supabase] Environment variables belum diset. Set SUPABASE_URL & SUPABASE_ANON_KEY pada project.',
    'color:orange;font-weight:bold'
  );
} else {
  console.log('%c[Supabase] Connected', 'color:green;font-weight:bold');
}

// createClient tetap dipanggil agar import di file lain tidak crash, meski env kosong.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key');
