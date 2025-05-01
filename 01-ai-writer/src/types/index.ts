/**
 * Common types used across the application
 */

/** Response format for all API calls */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}

/** Writing style configuration */
export interface WritingStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

/** Editor configuration */
export interface EditorConfig {
  theme: 'light' | 'dark';
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
}

/** Chat message structure */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
} 