import api from './axios';

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  folder: string;
  createdAt: string;
}

export interface MediaQuery {
  page?: number;
  limit?: number;
  folder?: string;
  mimeType?: string;
}

export const mediasApi = {
  findAll: async (query?: MediaQuery) => {
    const response = await api.get('/api/medias', { params: query });
    return response.data;
  },

  upload: async (file: File, folder: string = 'general'): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    const response = await api.post('/api/medias/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  uploadMultiple: async (files: File[], folder: string = 'general'): Promise<Media[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('folder', folder);
    
    const response = await api.post('/api/medias/upload-multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/medias/${id}`);
  },
};

export default mediasApi;
