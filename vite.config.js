import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://2.154.81.198:80',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        }
      }
    }
  }
})
