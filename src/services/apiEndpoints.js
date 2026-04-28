// All API endpoint URL strings are defined here.
// Import from this file so that URL changes only need to happen in one place.

export const AUTH_ENDPOINTS = {
  register: '/auth/register',
  login:    '/auth/login',
  refresh:  '/auth/refresh',
  me:       '/auth/me',
  users:    '/auth/users',
  userRole:    (userId) => `/auth/users/${userId}/role`,
  userBlocked: (userId) => `/auth/users/${userId}/blocked`,
};

export const TICKET_ENDPOINTS = {
  list:   '/tickets',
  create: '/tickets',
  get:    (ticketId) => `/tickets/${ticketId}`,
  update: (ticketId) => `/tickets/${ticketId}`,
  delete: (ticketId) => `/tickets/${ticketId}`,
};
