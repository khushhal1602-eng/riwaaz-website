import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/riwaaz-website/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
