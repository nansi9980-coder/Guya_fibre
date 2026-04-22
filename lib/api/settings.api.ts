import api from './axios';

export interface SettingsGroup {
  [key: string]: string | boolean | number;
}

export const settingsApi = {
  getGroup: async (group: string): Promise<SettingsGroup> => {
    const response = await api.get(`/api/settings/${group}`);
    return response.data;
  },

  updateGroup: async (group: string, data: Record<string, string | boolean | number>): Promise<SettingsGroup> => {
    const response = await api.put(`/api/settings/${group}`, data);
    return response.data;
  },

  getPublicTheme: async (): Promise<{ activePalette: string }> => {
    const response = await api.get('/api/settings/theme/public');
    return response.data;
  },
};

export default settingsApi;
