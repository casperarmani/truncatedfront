import { toast } from '@/components/ui/use-toast';

/**
 * Displays an error notification
 * @param message - The error message to display
 */
export function showError(message: string): void {
  toast({
    variant: "destructive",
    title: "Error",
    description: message,
  });
}

/**
 * Displays a success notification
 * @param message - The success message to display
 */
export function showSuccess(message: string): void {
  toast({
    title: "Success",
    description: message,
  });
}