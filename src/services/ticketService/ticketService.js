import { AuthAxios } from '../apiClient';
import { TICKET_ENDPOINTS } from '../apiEndpoints';

export const TicketAPI = {
  listTickets: () => AuthAxios.get(TICKET_ENDPOINTS.list).then(res => ({
    ...res,
    data: res.data.map(t => ({ ...t, createdAt: t.created_at, updatedAt: t.updated_at })),
  })),

  createTicket: (data) => AuthAxios.post(TICKET_ENDPOINTS.create, data).then(res => ({
    ...res,
    data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at },
  })),

  getTicket: (ticketId) => AuthAxios.get(TICKET_ENDPOINTS.get(ticketId)).then(res => ({
    ...res,
    data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at },
  })),

  updateTicket: (ticketId, data) => AuthAxios.patch(TICKET_ENDPOINTS.update(ticketId), data).then(res => ({
    ...res,
    data: { ...res.data, createdAt: res.data.created_at, updatedAt: res.data.updated_at },
  })),

  deleteTicket: (ticketId) => AuthAxios.delete(TICKET_ENDPOINTS.delete(ticketId)),
};
