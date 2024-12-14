import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { formatSubscriptionStatus } from '@/utils/subscription';

export function SubscriptionStatus() {
  const { subscriptionStatus, isLoading, error } = useSubscription();

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading subscription status...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (!subscriptionStatus) {
    return <div className="text-sm text-muted-foreground">No active subscription</div>;
  }

  return (
    <div className="text-sm">
      {formatSubscriptionStatus(subscriptionStatus)}
    </div>
  );
}