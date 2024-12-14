import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState, LoginCredentials } from '@/types/auth';
import { setAuthToken, clearAuthData, parseUserFromToken } from '@/utils/auth';
import api from '@/services/api';
import { showError } from '@/utils/error';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const navigate = useNavigate();

  const handleAuthResponse = useCallback((response: { token: string }) => {
    if (response.token) {
      setAuthToken(response.token);
      const user = parseUserFromToken(response.token);
      setState(prev => ({ ...prev, user, loading: false, error: null }));
      return true;
    }
    return false;
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.login(credentials.email, credentials.password);
      
      if (handleAuthResponse(response)) {
        navigate('/app');
        return { success: true };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setState(prev => ({ ...prev, loading: false, error: message }));
      showError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      clearAuthData();
      setState({ user: null, loading: false, error: null });
      navigate('/login');
    } catch (error) {
      showError('Logout failed');
    }
  };

  return {
    ...state,
    login,
    logout
  };
}