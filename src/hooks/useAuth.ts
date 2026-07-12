import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
  const [user, setUser] = useState<{ id: string; email: string; role: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage on mount
    const storedUser = localStorage.getItem('transitops_user');
    const token = localStorage.getItem('transitops_token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      const { user, accessToken, refreshToken } = data.data;

      localStorage.setItem('transitops_token', accessToken);
      localStorage.setItem('transitops_refresh_token', refreshToken);
      localStorage.setItem('transitops_user', JSON.stringify(user));

      setUser(user);
      navigate({ to: '/app/dashboard' });
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('transitops_token');
    localStorage.removeItem('transitops_refresh_token');
    localStorage.removeItem('transitops_user');
    setUser(null);
    navigate({ to: '/login' });
  };

  return { user, login, logout, isLoading };
};
