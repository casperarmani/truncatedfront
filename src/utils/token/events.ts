type TokenEventCallback = (event: CustomEvent) => void;

export const TOKEN_EVENTS = {
  UPDATE: 'token:update',
  ERROR: 'token:error',
  STATE_CHANGE: 'token:state-change'
} as const;

export class TokenEventEmitter {
  private static instance: TokenEventEmitter;
  private eventTarget: EventTarget;

  private constructor() {
    this.eventTarget = new EventTarget();
  }

  static getInstance(): TokenEventEmitter {
    if (!TokenEventEmitter.instance) {
      TokenEventEmitter.instance = new TokenEventEmitter();
    }
    return TokenEventEmitter.instance;
  }

  emit(eventName: string, detail: unknown) {
    const event = new CustomEvent(eventName, { detail });
    this.eventTarget.dispatchEvent(event);
  }

  on(eventName: string, callback: TokenEventCallback) {
    this.eventTarget.addEventListener(eventName, callback as EventListener);
    return () => this.off(eventName, callback);
  }

  off(eventName: string, callback: TokenEventCallback) {
    this.eventTarget.removeEventListener(eventName, callback as EventListener);
  }
}