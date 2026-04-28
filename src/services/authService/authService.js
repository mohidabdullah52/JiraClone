import { AuthAxios, NoAuthAxios } from '../apiClient';
import { AUTH_ENDPOINTS } from '../apiEndpoints';

export const AuthAPI = {
  register: (data) => NoAuthAxios.post(AUTH_ENDPOINTS.register, data),

  login: (data) => NoAuthAxios.post(AUTH_ENDPOINTS.login, data).then(res => ({
    ...res,
    data: {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      tokenType: res.data.token_type,
    },
  })),

  refresh: (data) => NoAuthAxios.post(AUTH_ENDPOINTS.refresh, data).then(res => ({
    ...res,
    data: { accessToken: res.data.access_token, tokenType: res.data.token_type },
  })),

  me: () => AuthAxios.get(AUTH_ENDPOINTS.me).then(res => ({
    ...res,
    data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at },
  })),

  listUsers: () => AuthAxios.get(AUTH_ENDPOINTS.users).then(res => ({
    ...res,
    data: res.data.map(u => ({ ...u, isBlocked: u.is_blocked, createdAt: u.created_at })),
  })),

  updateUserRole: (userId, roleData) =>
    AuthAxios.patch(AUTH_ENDPOINTS.userRole(userId), roleData).then(res => ({
      ...res,
      data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at },
    })),

  updateUserBlocked: (userId, blockData) =>
    AuthAxios.patch(AUTH_ENDPOINTS.userBlocked(userId), blockData).then(res => ({
      ...res,
      data: { ...res.data, isBlocked: res.data.is_blocked, createdAt: res.data.created_at },
    })),
};
