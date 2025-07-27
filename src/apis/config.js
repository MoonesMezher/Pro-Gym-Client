import axios from 'axios';
import API from './init';
import useAuthStore from '@/store/auth.store';

const BASE = "http://127.0.0.1:4000/api";

// Create the main API instance
const apiInstance = axios.create({
    baseURL: BASE,
    headers: {
        'Content-Type': "application/json",
    },
});

// Set up request interceptor
apiInstance.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Set up response interceptor
apiInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const { refreshToken } = useAuthStore.getState();
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        
            try {
                const { data } = await apiService.post(
                    API.USERS.POST.REFRESH, 
                    { refreshToken }
                );

                console.log(data)
                
                // Update store with new tokens
                useAuthStore.getState().setToken(data.token, data.refreshToken);
                
                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return apiService(originalRequest);
            } catch (refreshError) {
                // Handle refresh failure
                if (refreshError.response?.data?.code === "REFRESH_TOKEN_EXPIRED") {
                    useAuthStore.getState().clearAuth();
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiInstance