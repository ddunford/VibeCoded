export interface SummaryOptions {
  length: 'brief' | 'detailed' | 'custom';
  format: 'bullet' | 'paragraph' | 'key-points';
  customLength?: number;
}

export interface SummaryResult {
  content: string;
  source: string;
  timestamp: number;
  options: SummaryOptions;
}

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  message: string;
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
} 