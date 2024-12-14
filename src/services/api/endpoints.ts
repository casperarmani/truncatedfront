// API Endpoint Constants
export const API_ENDPOINTS = {
  AUTH: {
    STATUS: '/auth_status',
    LOGIN: '/login',
    SIGNUP: '/signup',
    LOGOUT: '/logout'
  },
  CONVERSATIONS: {
    BASE: '/conversations',
    MESSAGES: (id: string) => `/conversations/${id}/messages`,
    UPDATE: (id: string) => `/conversations/${id}`,
    DELETE: (id: string) => `/conversations/${id}`
  },
  MESSAGES: {
    SEND: '/send_message'
  },
  HISTORY: {
    CHAT: '/chat_history',
    VIDEO: '/video_analysis_history'
  },
  HEALTH: '/health'
} as const;