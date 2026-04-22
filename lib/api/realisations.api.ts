import api from './axios';

export interface Realisation {
  id: string;
  slug: string;
  titleFr: string;
  titleEn?: string;
  location: string;
  date: string;
  scope: string;
  descFr: string;
  descEn?: string;
  tags: string[];
  images: string[];
  client?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRealisationDto {
  slug: string;
  titleFr: string;
  titleEn?: string;
  location: string;
  date: string;
  scope: string;
  descFr: string;
  descEn?: string;
  tags: string[];
  images: string[];
  client?: string;
  isFeatured?: boolean;
}

export interface RealisationQuery {
  page?: number;
  limit?: number;
  tag?: string;
  location?: string;
  featured?: boolean;
}

export const realisationsApi = {
  findAll: async (query?: RealisationQuery) => {
    const response = await api.get('/api/realisations', { params: query });
    return response.data;
  },

  findOne: async (slug: string): Promise<Realisation> => {
    const response = await api.get(`/api/realisations/${slug}`);
    return response.data;
  },

  create: async (data: CreateRealisationDto): Promise<Realisation> => {
    const response = await api.post('/api/realisations', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateRealisationDto>): Promise<Realisation> => {
    const response = await api.put(`/api/realisations/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/realisations/${id}`);
  },

  toggle: async (id: string): Promise<Realisation> => {
    const response = await api.patch(`/api/realisations/${id}/toggle`);
    return response.data;
  },

  toggleFeatured: async (id: string): Promise<Realisation> => {
    const response = await api.patch(`/api/realisations/${id}/featured`);
    return response.data;
  },
};

export default realisationsApi;
