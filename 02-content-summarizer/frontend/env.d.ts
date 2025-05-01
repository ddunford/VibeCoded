/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OLLAMA_API_URL: string
  readonly VITE_OLLAMA_MODEL: string
  readonly VITE_OLLAMA_TIMEOUT: string
  readonly VITE_MAX_FILE_SIZE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 