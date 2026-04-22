import api from './axios';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  role?: 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';
  isActive?: boolean;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export const usersApi = {
  findAll: async (query?: UserQuery) => {
    const response = await api.get('/api/users', { params: query });
    return response.data;
  },

  findOne: async (id: string): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post('/api/users', data);
    return response.data;
  },

  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },

  changePassword: async (id: string, currentPassword: string, newPassword: string): Promise<void> => {
    await api.post(`/api/users/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
  },
};

export default usersApi;
