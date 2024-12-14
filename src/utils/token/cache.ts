import { TokenInfo } from '@/types';

interface TokenCache {
  data: TokenInfo | null;
  timestamp: number;
}

export class TokenCacheManager {
  private cache: TokenCache = {
    data: null,
    timestamp: 0
  };

  set(data: TokenInfo) {
    this.cache = {
      data,
      timestamp: Date.now()
    };
  }

  get(): TokenCache {
    return this.cache;
  }

  clear() {
    this.cache = {
      data: null,
      timestamp: 0
    };
  }

  isValid(duration: number): boolean {
    return (
      this.cache.data !== null && 
      (Date.now() - this.cache.timestamp) < duration
    );
  }
}