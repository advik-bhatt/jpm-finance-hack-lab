import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replit/cloud friendly: bind 0.0.0.0, honor the platform PORT, and allow the
// proxy host so the dev server + preview work on *.replit.dev / *.replit.app.
const port = Number(process.env.PORT) || 5173

export default defineConfig({
  plugins: [react()],
  server: { host: true, port, allowedHosts: true },
  preview: { host: true, port, allowedHosts: true },
})
