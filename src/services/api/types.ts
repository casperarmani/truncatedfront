// API Response Types
export interface LoginResponse {
  success: boolean;
  message?: string;
}

export interface ConversationResponse {
  id: string;
  title: string;
  created_at: string;
}

export interface MessageResponse {
  messages: Array<{
    content: string;
    type: 'user' | 'bot' | 'error';
    timestamp: string;
  }>;
}

// API Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}