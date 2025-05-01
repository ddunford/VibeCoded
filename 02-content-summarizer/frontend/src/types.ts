export interface SummaryResult {
  id: string;
  summary: string;
  source: string;
  timestamp: string;
  options: {
    model: string;
    maxTokens: number;
    temperature: number;
  };
} 