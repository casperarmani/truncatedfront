import { 
  SubscriptionTier, 
  SubscriptionStatus, 
  StripeError, 
  CheckoutSession,
  PortalSession 
} from '@/types';

export async function createStripeCheckoutSession(selectedPlan: SubscriptionTier): Promise<string> {
  try {
    const response = await fetch(`/api/create-checkout-session/${selectedPlan}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const session: CheckoutSession = await response.json();
    if (!session?.url) {
      throw new Error('Invalid checkout session');
    }
    
    return session.url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Checkout error: ${error.message}`);
    }
    throw new Error('Failed to create checkout session');
  }
}

export async function createStripePortalSession(): Promise<string> {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create portal session');
    }

    const session: PortalSession = await response.json();
    if (!session?.url) {
      throw new Error('Invalid portal session');
    }

    return session.url;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Portal error: ${error.message}`);
    }
    throw new Error('Failed to create portal session');
  }
}

export async function fetchSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const response = await fetch('/api/subscriptions/current');
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch subscription status');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Subscription status error: ${error.message}`);
    }
    throw new Error('Failed to fetch subscription status');
  }
}

export function formatSubscriptionStatus(status: SubscriptionStatus): string {
  const statusText = status.status.charAt(0).toUpperCase() + status.status.slice(1);
  const tierText = status.tier.charAt(0).toUpperCase() + status.tier.slice(1);
  
  let text = `${tierText} Plan (${statusText})`;
  
  if (status.cancelAtPeriodEnd) {
    text += ' - Cancels at period end';
  }
  
  if (status.currentPeriodEnd) {
    const endDate = new Date(status.currentPeriodEnd).toLocaleDateString();
    text += ` - Renews ${endDate}`;
  }
  
  return text;
}

export function isStripeError(error: unknown): error is StripeError {
  return error instanceof Error && 'type' in error;
}