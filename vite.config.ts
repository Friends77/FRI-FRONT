import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import Checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Checker({ typescript: true }), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
