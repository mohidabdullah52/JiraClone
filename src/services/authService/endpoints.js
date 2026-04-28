import { AuthAxios, NoAuthAxios } from './apiClient';

export const AuthAPI = {
  register: (data) => NoAuthAxios.post('/auth/register', data),
  login: (data) => NoAuthAxios.post('/auth/login', data).then(res => ({
      ...res,
      data: {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          tokenType: res.data.token_type
      }
  })),
  refresh: (data) => NoAuthAxios.post('/auth/refresh', data).then(res => ({
      ...res,
      data: { accessToken: res.data.access_token, tokenType: res.data.token_type }
  })),
  me: () => AuthAxios.get('/auth/me').then(res => ({
      ...res,
      data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at }
  })),
  listUsers: () => AuthAxios.get('/auth/users').then(res => ({
      ...res,
      data: res.data.map(u => ({ ...u, isBlocked: u.is_blocked, createdAt: u.created_at }))
  })),
  updateUserRole: (userId, roleData) => AuthAxios.patch(`/auth/users/${userId}/role`, roleData).then(res => ({
      ...res,
      data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at }
  })),
  updateUserBlocked: (userId, blockData) => AuthAxios.patch(`/auth/users/${userId}/blocked`, blockData).then(res => ({
      ...res,
      data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at }
  })),
};


export const TicketAPI = {
  listTickets: () => AuthAxios.get('/tickets').then(res => ({
      ...res,
      data: res.data.map(t => ({ ...t, createdAt: t.created_at, updatedAt: t.updated_at }))
  })),
  createTicket: (data) => AuthAxios.post('/tickets', data).then(res => ({
      ...res,
      data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at }
  })),
  getTicket: (ticketId) => AuthAxios.get(`/tickets/${ticketId}`).then(res => ({
      ...res,
      data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at }
  })),
  updateTicket: (ticketId, data) => AuthAxios.patch(`/tickets/${ticketId}`, data).then(res => ({
      ...res,
      data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at }
  })),
  deleteTicket: (ticketId) => AuthAxios.delete(`/tickets/${ticketId}`),
};
