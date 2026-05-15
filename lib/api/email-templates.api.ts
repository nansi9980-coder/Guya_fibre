import api from './axios';

export interface EmailTemplate {
  id: string;
  slug: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  variables: string[];
  updatedAt: string;
}

export interface UpdateTemplateDto {
  subject?: string;
  bodyHtml?: string;
  bodyText?: string;
}

export const emailTemplatesApi = {
  findAll: async (): Promise<EmailTemplate[]> => {
    const response = await api.get('/api/email-templates');
    return response.data;
  },

  findOne: async (slug: string): Promise<EmailTemplate> => {
    const response = await api.get(`/api/email-templates/${slug}`);
    return response.data;
  },

  update: async (slug: string, data: UpdateTemplateDto): Promise<EmailTemplate> => {
    const response = await api.put(`/api/email-templates/${slug}`, data);
    return response.data;
  },

  sendTest: async (slug: string, email: string): Promise<{ message: string }> => {
    const response = await api.post('/api/email-templates/test', { email });
    return response.data;
  },
};

export default emailTemplatesApi;
