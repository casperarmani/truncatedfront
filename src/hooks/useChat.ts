import { debugLog } from '@/utils/debug';

// Add to error handling in useChat:
} catch (error) {
  debugLog('useChat', error);
  setError('Failed to send message');
  throw error;
}