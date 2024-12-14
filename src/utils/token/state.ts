import { TokenState } from './types';

export class TokenStateManager {
  private initialState: TokenState = {
    data: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isLoginTransition: false
  };

  private state: TokenState;

  constructor() {
    this.state = { ...this.initialState };
  }

  setState(updates: Partial<TokenState>) {
    this.state = { ...this.state, ...updates };
    return this.state;
  }

  getState(): TokenState {
    return this.state;
  }

  reset() {
    this.state = { ...this.initialState };
    return this.state;
  }
}