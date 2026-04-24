import axios from 'axios';

export const NoAuthAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const AuthAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

AuthAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AuthAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Adjusted endpoint to match OpenAPI spec: /auth/refresh
                    const response = await NoAuthAxios.post('/auth/refresh', {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access_token || response.data.access;
                    localStorage.setItem('accessToken', newAccessToken);

                    if (response.data.refresh_token || response.data.refresh) {
                        localStorage.setItem('refreshToken', response.data.refresh_token || response.data.refresh);
                    }
                    
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return AuthAxios(originalRequest);

                } catch (refreshError) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenType');
                }
            } else {
                localStorage.removeItem('accessToken');
            }
        }
        return Promise.reject(error);
    }
);
