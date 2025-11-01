import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ jalankan di port 4000 tanpa .env
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
})
