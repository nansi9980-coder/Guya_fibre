import { create } from 'zustand';
import { authApi, LoginRequest, LoginResponse } from '../api/auth.api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { accessToken, refreshToken, user } = response;
      
      // Save tokens to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur de connexion';
      set({
        error: message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API fails
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    }
  },

  refreshToken: async () => {
    try {
      const response = await authApi.refresh();
      const { accessToken } = response;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
      }
      
      set({ accessToken });
    } catch (error) {
      // If refresh fails, logout
      get().logout();
    }
  },

  setAccessToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
    set({ accessToken: token, isAuthenticated: true });
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Initialize auth state from localStorage on client side
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('accessToken');
  if (token) {
    useAuthStore.setState({ accessToken: token, isAuthenticated: true });
    
    // Fetch user info
    authApi.me()
      .then((user) => {
        useAuthStore.setState({ user, isInitialized: true });
      })
      .catch(() => {
        // Token invalid, clear it
        localStorage.removeItem('accessToken');
        useAuthStore.setState({ accessToken: null, isAuthenticated: false, isInitialized: true });
      });
  } else {
    useAuthStore.setState({ isInitialized: true });
  }
}