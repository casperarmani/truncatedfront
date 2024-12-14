import { API_ENDPOINTS } from './endpoints';
import { handleResponse, createFormData, logError } from './utils';
import type { 
  LoginResponse, 
  ConversationResponse, 
  MessageResponse,
  ApiError 
} from './types';
import type { ApiResponse, ChatHistory, VideoHistory } from '@/types';

const api = {
  async checkAuth(): Promise<boolean> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.STATUS);
      const data = await handleResponse<{ authenticated: boolean }>(response);
      return data.authenticated;
    } catch (error) {
      logError(error as Error, 'checkAuth');
      return false;
    }
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const formData = createFormData({ email, password });
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: formData
    });
    return handleResponse<LoginResponse>(response);
  },

  async signup(email: string, password: string): Promise<LoginResponse> {
    const formData = createFormData({ email, password });
    const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: formData
    });
    return handleResponse<LoginResponse>(response);
  },

  async logout(): Promise<boolean> {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST'
    });
    return response.ok;
  },

  async createConversation(title: string): Promise<ConversationResponse> {
    const formData = createFormData({ title });
    const response = await fetch(API_ENDPOINTS.CONVERSATIONS.BASE, {
      method: 'POST',
      body: formData
    });
    return handleResponse<ConversationResponse>(response);
  },

  async getConversations(): Promise<ConversationResponse[]> {
    const response = await fetch(API_ENDPOINTS.CONVERSATIONS.BASE);
    return handleResponse<ConversationResponse[]>(response);
  },

  async getConversationMessages(conversationId: string): Promise<MessageResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.CONVERSATIONS.MESSAGES(conversationId));
      return handleResponse<MessageResponse>(response);
    } catch (error) {
      if (error instanceof ApiError && 
          (!error.message?.includes('Failed to fetch') && 
           !error.message?.includes('conversation not found'))) {
        throw error;
      }
      return { messages: [] };
    }
  },

  async sendMessage(
    message: string, 
    videos: File[] = [], 
    conversationId: string | null = null
  ) {
    const formData = createFormData({
      message,
      conversation_id: conversationId,
      videos
    });

    const response = await fetch(API_ENDPOINTS.MESSAGES.SEND, {
      method: 'POST',
      body: formData
    });
    return handleResponse(response);
  },

  async updateConversationTitle(
    conversationId: string, 
    title: string
  ): Promise<ConversationResponse> {
    if (!title?.trim()) {
      throw new ApiError('Title cannot be empty');
    }

    const formData = createFormData({ title: title.trim() });
    const response = await fetch(API_ENDPOINTS.CONVERSATIONS.UPDATE(conversationId), {
      method: 'PUT',
      body: formData
    });
    return handleResponse<ConversationResponse>(response);
  },

  async deleteConversation(conversationId: string): Promise<{ success: boolean }> {
    if (!conversationId) {
      throw new ApiError('Invalid conversation ID');
    }

    const response = await fetch(API_ENDPOINTS.CONVERSATIONS.DELETE(conversationId), {
      method: 'DELETE'
    });
    return handleResponse<{ success: boolean }>(response);
  },

  async getChatHistory(): Promise<ApiResponse<ChatHistory>> {
    const response = await fetch(API_ENDPOINTS.HISTORY.CHAT);
    return handleResponse<ApiResponse<ChatHistory>>(response);
  },

  async getVideoAnalysisHistory(): Promise<ApiResponse<VideoHistory>> {
    const response = await fetch(API_ENDPOINTS.HISTORY.VIDEO);
    return handleResponse<ApiResponse<VideoHistory>>(response);
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      const health = await handleResponse<{ status: string }>(response);
      return health.status === 'healthy';
    } catch (error) {
      logError(error as Error, 'healthCheck');
      return false;
    }
  }
};

export default api;
export * from './types';