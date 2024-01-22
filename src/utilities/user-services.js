import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; 

const api = axios.create({
    baseURL: API_BASE_URL
});

// user login
export const login = async (username, password) => {
    const response = await api.post('/token/', { username, password });
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
};

// refresh token
export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/token/refresh/', { refresh: refreshToken });
    localStorage.setItem('accessToken', response.data.access);
    return response.data.access;
};

// user logout
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

// axios Interceptor to handle automatic token refresh and error responses
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Check for token expiration (401 error)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const newAccessToken = await refreshToken();
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                
                // Update the original request header and retry
                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return api(originalRequest);
            } catch (refreshError) {
                // Redirect to login or take appropriate action if token refresh fails
                window.location = '/login';
                return Promise.reject(refreshError);
            }
        }
        // Handle other types of errors
        return Promise.reject(error);
    }
);


export default api;