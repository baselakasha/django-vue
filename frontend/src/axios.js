import axios from 'axios';
import { useAuthStore } from './stores/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'    
  }
})

// Request interceptor to add the Authorization header
apiClient.interceptors.request.use(config => {
  const authStore = useAuthStore();
  if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to refresh token on 401 error
apiClient.interceptors.response.use(response => {
  return response;
}, async error => {
  const authStore = useAuthStore();
  if (!authStore.token) {
      return Promise.reject(error);
  }
  const originalRequest = error.config;
  
  if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await authStore.refreshToken();
      originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
      return apiClient(originalRequest);
  }

  return Promise.reject(error);
});

export default apiClient 
