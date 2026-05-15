import api from './axios';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/auth/logout');
  },

  refresh: async (): Promise<{ accessToken: string }> => {
    const response = await api.post<{ accessToken: string }>('/api/auth/refresh', {});
    return response.data;
  },

  me: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await api.post('/api/auth/change-password', data);
  },
};

export default authApi;