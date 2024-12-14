import { debugLog } from '@/utils/debug';

// Add to error handling in useConversationManager:
} catch (error) {
  debugLog('useConversationManager', error);
  showError('Failed to load conversations');
}