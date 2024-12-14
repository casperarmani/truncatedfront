export const TOKEN_CONSTANTS = {
  CACHE_DURATION: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  INITIAL_FETCH_DELAY: 2000,
  REQUEST_TIMEOUT: 5000,
  UPDATE_INTERVAL: 60000, // 1 minute
  ERROR_MESSAGES: {
    TIMEOUT: 'Request timed out',
    UNAUTHORIZED: 'Not authenticated',
    FETCH_ERROR: 'Failed to fetch token information'
  }
} as const;

export const TOKEN_ENDPOINTS = {
  INFO: '/user/tokens',
  AUTH_STATUS: '/auth_status'
} as const;

export const TOKEN_HEADERS = {
  NO_CACHE: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
} as const;