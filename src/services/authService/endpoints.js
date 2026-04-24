import { AuthAxios, NoAuthAxios } from './apiClient';

/**
 * Authentication & User Management Endpoints
 */
export const AuthAPI = {
  register: (data) => NoAuthAxios.post('/auth/register', data),
  login: (data) => NoAuthAxios.post('/auth/login', data),
  refresh: (data) => NoAuthAxios.post('/auth/refresh', data),
  me: () => AuthAxios.get('/auth/me'),
  listUsers: () => AuthAxios.get('/auth/users'),
  updateUserRole: (userId, roleData) => AuthAxios.patch(`/auth/users/${userId}/role`, roleData),
  updateUserBlocked: (userId, blockData) => AuthAxios.patch(`/auth/users/${userId}/blocked`, blockData),
};

/**
 * Tickets Management Endpoints
 */
export const TicketAPI = {
  listTickets: () => AuthAxios.get('/tickets'),
  createTicket: (data) => AuthAxios.post('/tickets', data),
  getTicket: (ticketId) => AuthAxios.get(`/tickets/${ticketId}`),
  updateTicket: (ticketId, data) => AuthAxios.patch(`/tickets/${ticketId}`, data),
  deleteTicket: (ticketId) => AuthAxios.delete(`/tickets/${ticketId}`),
};
