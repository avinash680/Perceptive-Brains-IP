import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  // Use absolute base so assets resolve correctly on client-side route refreshes
  base: '/',
  plugins: [react(), tailwindcss()],
})


