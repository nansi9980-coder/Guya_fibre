import api from './axios';

export interface ServiceContent {
  id: string;
  slug: string;
  number: string;
  icon: string;
  titleFr: string;
  titleEn?: string;
  descFr: string;
  descEn?: string;
  features: string[];
  image?: string;
  benefit?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  slug: string;
  number: string;
  icon: string;
  titleFr: string;
  titleEn?: string;
  descFr: string;
  descEn?: string;
  features: string[];
  image?: string;
  benefit?: string;
}

export const servicesApi = {
  findAll: async (): Promise<ServiceContent[]> => {
    const response = await api.get('/api/services-content');
    return response.data;
  },

  findOne: async (id: string): Promise<ServiceContent> => {
    const response = await api.get(`/api/services-content/${id}`);
    return response.data;
  },

  create: async (data: CreateServiceDto): Promise<ServiceContent> => {
    const response = await api.post('/api/services-content', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateServiceDto>): Promise<ServiceContent> => {
    const response = await api.put(`/api/services-content/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/services-content/${id}`);
  },

  reorder: async (ids: string[]): Promise<void> => {
    await api.patch('/api/services-content/reorder', { ids });
  },

  toggle: async (id: string): Promise<ServiceContent> => {
    const response = await api.patch(`/api/services-content/${id}/toggle`);
    return response.data;
  },
};

export default servicesApi;
