import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js + r3f + drei live in one lazy-loaded chunk (the 3D scene); the first paint stays small.
    chunkSizeWarningLimit: 1000,
  },
})
