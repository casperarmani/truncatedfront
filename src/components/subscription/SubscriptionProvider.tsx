import React from 'react';
import { useSubscriptionUpdates } from '@/hooks/useSubscriptionUpdates';

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  useSubscriptionUpdates();
  return <>{children}</>;
}