import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('transitops_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for automatic token refresh or logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        if (typeof window === "undefined") throw new Error('No window');
        
        const refreshToken = localStorage.getItem('transitops_refresh_token');
        if (!refreshToken) throw new Error('No refresh token');
        
        // Call refresh endpoint
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { token: refreshToken });
        
        // Save new tokens
        localStorage.setItem('transitops_token', data.data.accessToken);
        if (data.data.refreshToken) {
          localStorage.setItem('transitops_refresh_token', data.data.refreshToken);
        }
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, force logout
        if (typeof window !== "undefined") {
          localStorage.removeItem('transitops_token');
          localStorage.removeItem('transitops_refresh_token');
          localStorage.removeItem('transitops_user');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
