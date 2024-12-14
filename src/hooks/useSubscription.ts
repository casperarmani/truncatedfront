import { useState, useEffect } from 'react';
import { SubscriptionTier, SubscriptionStatus } from '@/types';
import { showError } from '@/utils/error';
import {
  createStripeCheckoutSession,
  createStripePortalSession,
  fetchSubscriptionStatus
} from '@/utils/subscription';

export function useSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    getCurrentSubscription();
    const intervalId = setInterval(getCurrentSubscription, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const createCheckoutSession = async (selectedPlan: SubscriptionTier) => {
    try {
      setIsLoading(true);
      setError(null);
      const url = await createStripeCheckoutSession(selectedPlan);
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start checkout process';
      setError(message);
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createPortalSession = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = await createStripePortalSession();
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access subscription management';
      setError(message);
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const subscription = await fetchSubscriptionStatus();
      setSubscriptionStatus(subscription);
      return subscription;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch subscription status';
      setError(message);
      showError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    subscriptionStatus,
    createCheckoutSession,
    createPortalSession,
    getCurrentSubscription
  };
}