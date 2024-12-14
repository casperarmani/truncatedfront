const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
} as const;

export class TokenLogger {
  private static instance: TokenLogger;
  private isDebugEnabled: boolean;

  private constructor() {
    this.isDebugEnabled = 
      process.env.NODE_ENV !== 'production' || 
      localStorage.getItem('DEBUG') === 'true';
  }

  static getInstance(): TokenLogger {
    if (!TokenLogger.instance) {
      TokenLogger.instance = new TokenLogger();
    }
    return TokenLogger.instance;
  }

  debug(message: string, ...args: unknown[]) {
    if (this.isDebugEnabled) {
      console.debug(`[Token] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    console.info(`[Token] ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(`[Token] ${message}`, ...args);
  }

  error(message: string, error?: Error, ...args: unknown[]) {
    console.error(`[Token] ${message}`, error, ...args);
  }
}