import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
      'import.meta.env.EMAILJS_SERVICE_ID': JSON.stringify(env.EMAILJS_SERVICE_ID ?? ''),
      'import.meta.env.EMAILJS_TEMPLATE_ID': JSON.stringify(env.EMAILJS_TEMPLATE_ID ?? ''),
      'import.meta.env.EMAILJS_PUBLIC_KEY': JSON.stringify(env.EMAILJS_PUBLIC_KEY ?? ''),
      'import.meta.env.EMAILJS_DEFAULT_RECIPIENT': JSON.stringify(env.EMAILJS_DEFAULT_RECIPIENT ?? ''),
    },
  }
})
