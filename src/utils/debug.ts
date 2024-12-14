export const isDevelopment = () => 
  process.env.NODE_ENV !== 'production' || 
  (window as any).DEBUG || 
  localStorage.getItem('DEBUG') === 'true';

export const debugLog = (context: string, error: Error | unknown) => {
  if (isDevelopment()) {
    console.error(`[${context}]:`, error);
  }
};