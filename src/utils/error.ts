import { toast } from '@/components/ui/use-toast';

/**
 * Displays an error message using the toast notification system
 * @param message - The error message to display
 */
export const showError = (message: string) => {
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
  });
};

/**
 * Displays a success message using the toast notification system
 * @param message - The success message to display
 */
export const showSuccess = (message: string) => {
  toast({
    title: "Success",
    description: message,
  });
};

/**
 * Logs an error to the console in development mode
 * @param error - The error object to log
 * @param context - The context where the error occurred
 */
export const logError = (error: Error, context: string) => {
  if (process.env.NODE_ENV !== 'production' || 
      window.DEBUG || 
      localStorage.getItem('DEBUG') === 'true') {
    console.error(`Error in ${context}:`, error);
  }
};