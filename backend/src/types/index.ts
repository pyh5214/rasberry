export type PoetOption = 'A' | 'B' | 'C' | 'D';

export interface PoetPrompt {
  [key: string]: string;
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface PoemRequest {
  option: PoetOption;
}

export interface PoemResponse {
  poem: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  apiKeySet: boolean;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | OpenAIContentPart[];
}

export interface OpenAIContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface OpenAIChoice {
  message: {
    content: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}
