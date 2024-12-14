import { useEffect } from 'react';
import { useTokenManagement } from './useTokenManagement';
import { useChat } from './useChat';
import { useConversations } from './useConversations';

export function useAuthCleanup() {
  const { stopTokenUpdates } = useTokenManagement();
  const { stopPolling } = useChat();
  const { setCurrentConversationId } = useConversations();

  const cleanup = () => {
    // Stop all active processes
    stopTokenUpdates();
    stopPolling();
    setCurrentConversationId(null);
    
    // Clean up local storage
    const keysToRemove = [
      'chatHistory',
      'analysisHistory',
      'conversations',
      'currentConversationId'
    ];
    
    keysToRemove.forEach(key => {
      window.localStorage.removeItem(key);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, []);

  return { cleanup };
}