export const config = {
  ollama: {
    apiUrl: import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434',
    model: import.meta.env.VITE_OLLAMA_MODEL || 'llama2',
    timeout: parseInt(import.meta.env.VITE_OLLAMA_TIMEOUT || '30000', 10)
  }
}; 