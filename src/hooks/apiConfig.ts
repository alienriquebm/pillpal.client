import { message } from 'antd';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API || 'http://localhost:4000';
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status && status !== 401) {
      const backendMsg =
        error.response.data?.message || error.response.data?.error || 'Ocurrió un error inesperado';
      message.error(backendMsg);
    }
    return Promise.reject(error);
  },
);
