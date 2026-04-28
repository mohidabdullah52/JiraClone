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

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

AuthAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return AuthAxios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    // Adjusted endpoint to match OpenAPI spec: /auth/refresh
                    const response = await NoAuthAxios.post('/auth/refresh', {
                        refresh: refreshToken
                    });

                    const { 
                        access_token: rawAccessToken, 
                        access: rawAccess, 
                        refresh_token: rawRefreshToken, 
                        refresh: rawRefresh 
                    } = response.data;

                    const newAccessToken = rawAccessToken || rawAccess;
                    localStorage.setItem('accessToken', newAccessToken);

                    const newRefreshToken = rawRefreshToken || rawRefresh;
                    if (newRefreshToken) {
                        localStorage.setItem('refreshToken', newRefreshToken);
                    }
                    
                    processQueue(null, newAccessToken);
                    
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return AuthAxios(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('tokenType');
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                isRefreshing = false;
                localStorage.removeItem('accessToken');
            }
        }
        return Promise.reject(error);
    }
);
