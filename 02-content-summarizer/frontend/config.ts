export const config = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFileTypes: ['application/pdf'],
  ollamaEndpoint: 'http://localhost:11434/api/generate',
  defaultModel: 'llama2',
  defaultSummaryOptions: {
    length: 'brief' as const,
    format: 'bullet' as const,
  },
} as const; 