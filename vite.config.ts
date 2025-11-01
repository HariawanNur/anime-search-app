import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Base path harus sesuai nama repo untuk GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/anime-search-app/', // tambahkan ini
  server: {
    port: 4000,
  },
});
