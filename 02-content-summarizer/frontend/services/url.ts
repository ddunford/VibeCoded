import { config } from '../config';

export class URLService {
  private static instance: URLService;
  private readonly apiUrl = 'http://localhost:3001/api';

  private constructor() {}

  public static getInstance(): URLService {
    if (!URLService.instance) {
      URLService.instance = new URLService();
    }
    return URLService.instance;
  }

  public async extractContent(url: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/extract-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error extracting content from URL:', error);
      throw error;
    }
  }

  public validateURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
} 