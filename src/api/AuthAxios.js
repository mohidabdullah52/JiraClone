import axios from 'axios';
import NoAuthAxios from './NoAuthAxios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh');

            if (refreshToken) {
                try {
                    const response = await NoAuthAxios.post('/refresh', {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access_token || response.data.access;

                    localStorage.setItem('access', newAccessToken);

                    if (response.data.refresh_token || response.data.refresh) {
                        localStorage.setItem('refresh', response.data.refresh_token || response.data.refresh);
                    }
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('token_type');
                }
            } else {
                localStorage.removeItem('access');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
