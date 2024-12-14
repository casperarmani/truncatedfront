import { User } from '@/types';

export const AUTH_STORAGE_KEY = 'auth_token';

export const clearAuthData = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const parseUserFromToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing user from token:', error);
    return null;
  }
};