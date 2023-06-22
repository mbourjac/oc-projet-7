/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@images': resolve(__dirname, 'src/assets/images'),
      '@styles': resolve(__dirname, 'src/assets/styles'),
      '@data': resolve(__dirname, 'src/data'),
    },
  },
});
