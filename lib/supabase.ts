import { createClient } from '@supabase/supabase-js';

// Helper to safely access env variables avoiding TS errors on import.meta
const getEnv = (key: string) => {
  // Menggunakan casting 'any' untuk menghindari error: Property 'env' does not exist on type 'ImportMeta'
  return (import.meta as any).env?.[key];
};

const envUrl = getEnv('VITE_SUPABASE_URL');
const envKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Check if user has configured their own project
// We check if it exists, is not empty, and is not the placeholder text
const isCustomConfig = envUrl && envUrl.length > 0 && !envUrl.includes('your-project-url');

// Fallback configuration (Demo Project)
const FALLBACK_URL = 'https://xxx.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaWlwcnhtZnlocHJvZXd3eXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NzQyMDEsImV4cCI6MjA4NTE1MDIwMX0.NXePku-CHtv_tmR_s2eHRd61LeNnA6ZDQNqdE7fyjxg';

const supabaseUrl = isCustomConfig ? envUrl : FALLBACK_URL;
const supabaseAnonKey = isCustomConfig ? envKey : FALLBACK_KEY;

// Create client - guaranteed to be non-null so other files don't crash
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isConfigured = isCustomConfig;

if (isCustomConfig) {
  console.log('%c[Supabase] Connected to Custom Project', 'color:green;font-weight:bold');
} else {
  console.log('%c[Supabase] Using Demo/Fallback Project', 'color:orange;font-weight:bold');
}
