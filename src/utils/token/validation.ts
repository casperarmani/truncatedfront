import { TokenInfo } from '@/types';

export class TokenValidator {
  static isValidTokenInfo(data: unknown): data is TokenInfo {
    if (!data || typeof data !== 'object') return false;
    
    const info = data as Partial<TokenInfo>;
    
    return (
      typeof info.token_balance === 'number' &&
      (info.subscription === undefined || (
        typeof info.subscription === 'object' &&
        info.subscription !== null &&
        (!info.subscription.subscription_tiers || (
          typeof info.subscription.subscription_tiers === 'object' &&
          typeof info.subscription.subscription_tiers.tier_name === 'string' &&
          typeof info.subscription.subscription_tiers.tokens === 'number'
        ))
      ))
    );
  }

  static validateTokenBalance(balance: number): boolean {
    return Number.isFinite(balance) && balance >= 0;
  }

  static validateSubscriptionTier(tier: unknown): boolean {
    if (!tier || typeof tier !== 'object') return false;
    const { tier_name, tokens } = tier as any;
    return (
      typeof tier_name === 'string' &&
      typeof tokens === 'number' &&
      Number.isFinite(tokens) &&
      tokens > 0
    );
  }
}