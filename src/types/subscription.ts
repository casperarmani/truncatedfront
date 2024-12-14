export type SubscriptionTier = 'pro' | 'agency';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface StripeError extends Error {
  type?: string;
  code?: string;
  decline_code?: string;
  param?: string;
}

export interface CheckoutSession {
  url: string;
  id: string;
}

export interface PortalSession {
  url: string;
}