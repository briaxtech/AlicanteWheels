import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // STRICTLY define only the specific API_KEY to be replaced at build time.
      // We DO NOT inject the entire 'process.env' object as it causes crashes in browsers/Vercel.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});