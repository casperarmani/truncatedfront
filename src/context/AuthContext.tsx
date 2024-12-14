import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';
import { useTokenManagement } from '@/hooks/useTokenManagement';
import { updateConnectionStatus } from '@/utils/connection';
import { useAuthCleanup } from '@/hooks/useAuthCleanup';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { startTokenUpdates, stopTokenUpdates } = useTokenManagement();
  const { cleanup: performAuthCleanup } = useAuthCleanup();

  useEffect(() => {
    checkAuthStatus();
    
    // Set up health check interval
    const healthCheckInterval = setInterval(async () => {
      const isHealthy = await api.checkHealth();
      updateConnectionStatus(isHealthy);
    }, 30000);

    return () => clearInterval(healthCheckInterval);
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await api.checkAuth();
      
      if (isAuthenticated) {
        setUser({ email: 'user@example.com', id: '1' });
        await startTokenUpdates();
      } else {
        setUser(null);
        stopTokenUpdates();
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setUser(null);
      stopTokenUpdates();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      
      if (response.success) {
        await checkAuthStatus();
        return { success: true };
      }
      
      return { 
        success: false, 
        message: response.message || 'Login failed'
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      performAuthCleanup();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};