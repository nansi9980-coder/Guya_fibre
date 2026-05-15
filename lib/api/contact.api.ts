import api from './axios';

export interface Contact {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  address?: string;
  postalCode?: string;
  city?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  address?: string;
  postalCode?: string;
  city?: string;
  message: string;
}

export interface ContactQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export const contactApi = {
  create: async (data: CreateContactRequest): Promise<{ id: string; reference: string }> => {
    const response = await api.post<{ id: string; reference: string }>('/api/contact', data);
    return response.data;
  },

  findAll: async (query?: ContactQuery) => {
    const response = await api.get('/api/contact', { params: query });
    return response.data;
  },

  findOne: async (id: string): Promise<Contact> => {
    const response = await api.get<Contact>(`/api/contact/${id}`);
    return response.data;
  },

  markAsRead: async (id: string): Promise<Contact> => {
    const response = await api.patch<Contact>(`/api/contact/${id}/read`);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/api/contact/${id}`);
  },
};

export default contactApi;
