/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        './src/router/index.tsx',
        '**/tests/**',
        './src/utils/apolloClient.ts',
        './codegen.ts',
        'eslint.config.mjs',
        'tailwind.config.js',
        '**/dist/**',
        './src/main.tsx',
        '**/gql/**',
        '**/queries/**.ts',
        '**/mutations/**.ts'
      ]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
