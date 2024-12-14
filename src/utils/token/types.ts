import { TokenInfo } from '@/types';

export interface TokenState {
  data: TokenInfo | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoginTransition: boolean;
}

export interface TokenUpdateCallbacks {
  onSuccess?: (data: TokenInfo) => void;
  onError?: (error: Error) => void;
  onStateChange?: (state: TokenState) => void;
}