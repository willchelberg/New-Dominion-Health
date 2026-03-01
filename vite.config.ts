import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      // Redirect any figma:asset imports to a placeholder
      'figma:asset': '/logo.png'
    },
  },
  server: {
    port: 3000,
  },
});