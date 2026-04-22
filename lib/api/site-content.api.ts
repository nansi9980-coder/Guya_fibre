import api from './axios';

export interface SiteContent {
  id: string;
  section: string;
  content: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export const siteContentApi = {
  getAll: async (): Promise<SiteContent[]> => {
    const response = await api.get<SiteContent[]>('/api/site-content');
    return response.data;
  },

  update: async (section: string, content: Record<string, any>): Promise<SiteContent> => {
    const response = await api.put<SiteContent>(`/api/site-content/${section}`, { content });
    return response.data;
  },

  reset: async (section: string): Promise<SiteContent> => {
    const response = await api.post<SiteContent>(`/api/site-content/${section}/reset`);
    return response.data;
  },
};

export default siteContentApi;
