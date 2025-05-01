import { config } from '../config';

export class OllamaService {
  private static instance: OllamaService;
  private apiUrl: string;
  private model: string;

  private constructor() {
    this.apiUrl = config.ollama.apiUrl;
    this.model = config.ollama.model;
  }

  public static getInstance(): OllamaService {
    if (!OllamaService.instance) {
      OllamaService.instance = new OllamaService();
    }
    return OllamaService.instance;
  }

  public async generateSummary(text: string, options: { length: string; format: string }): Promise<string> {
    const prompt = this.buildPrompt(text, options);
    
    try {
      const response = await fetch(`${this.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: "You are a professional content summarizer. Provide clear, concise summaries."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message?.content || '';
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  }

  private buildPrompt(text: string, options: { length: string; format: string }): string {
    const lengthInstruction = options.length === 'brief' 
      ? 'Provide a brief summary'
      : options.length === 'detailed'
      ? 'Provide a detailed summary'
      : 'Provide a comprehensive summary';

    const formatInstruction = options.format === 'bullet'
      ? 'in bullet points'
      : options.format === 'key-points'
      ? 'highlighting key points'
      : 'in paragraph form';

    return `${lengthInstruction} of the following text ${formatInstruction}:\n\n${text}`;
  }
} 