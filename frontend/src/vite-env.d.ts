/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GEMINI_API_KEY?: string
  readonly EMAILJS_SERVICE_ID?: string
  readonly EMAILJS_TEMPLATE_ID?: string
  readonly EMAILJS_PUBLIC_KEY?: string
  readonly EMAILJS_DEFAULT_RECIPIENT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
