import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Muat semua env vars (termasuk yang tanpa prefix VITE_) dari .env files
  const env = loadEnv(mode, process.cwd(), '');

  const supabaseUrl = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const apiKey = env.API_KEY || env.GEMINI_API_KEY || '';

  return {
    // Injeksi kredensial saat build agar tidak perlu di-hardcode di source code.
    // Nilainya berasal dari environment variables resmi (integrasi Supabase / project vars).
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      '__SUPABASE_URL__': JSON.stringify(supabaseUrl),
      '__SUPABASE_ANON_KEY__': JSON.stringify(supabaseAnonKey),
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html'
        }
      }
    }
  };
});
