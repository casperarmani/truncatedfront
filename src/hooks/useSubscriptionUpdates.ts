import { useEffect } from 'react';
import { useSubscription } from './useSubscription';

const UPDATE_INTERVAL = 60000; // 1 minute

export function useSubscriptionUpdates() {
  const { getCurrentSubscription } = useSubscription();

  useEffect(() => {
    // Initial update
    getCurrentSubscription();

    // Set up periodic updates
    const intervalId = setInterval(() => {
      getCurrentSubscription();
    }, UPDATE_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [getCurrentSubscription]);
}