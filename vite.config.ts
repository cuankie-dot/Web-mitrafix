import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load .env so API_KEY is available at build/dev time (VITE_* vars are also auto-exposed).
  const env = loadEnv(mode, process.cwd(), '');

  const apiKey = env.VITE_GEMINI_API_KEY || env.API_KEY || '';

  return {
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
  };
});
