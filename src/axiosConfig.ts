import axios from 'axios';
import type { AxiosInstance } from 'axios';
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
