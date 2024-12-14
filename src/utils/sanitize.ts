/**
 * Sanitizes HTML strings to prevent XSS attacks
 * @param str - The string containing potential HTML to sanitize
 * @returns Sanitized string with HTML entities escaped
 */
export function sanitizeHTML(str: string): string {
  if (!str) return '';
  
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}