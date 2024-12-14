import { ApiError } from './types';

export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      data.detail || data.message || 'API request failed',
      response.status
    );
  }
  return response.json();
}

export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
}

export function logError(error: Error, context: string): void {
  if (process.env.NODE_ENV !== 'production' || 
      window.DEBUG || 
      localStorage.getItem('DEBUG') === 'true') {
    console.error(`API Error (${context}):`, error);
  }
}