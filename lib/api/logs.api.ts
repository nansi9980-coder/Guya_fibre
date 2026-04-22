import api from './axios';

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  userId?: string;
  createdAt: string;
}

export interface LogsQuery {
  page?: number;
  limit?: number;
  entity?: string;
  action?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export const logsApi = {
  findAll: async (query?: LogsQuery) => {
    const response = await api.get('/api/logs', { params: query });
    return response.data;
  },
};

export default logsApi;
