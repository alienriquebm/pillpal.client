import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import { LOGIN_EXPIRED_SESSION_ROUTE } from '../routes/routes';

const API_URL: string =
  (import.meta.env.VITE_PUBLIC_API as string | undefined) || 'http://localhost:4000';

export const apiAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* export const setAuthToken = (token: string | null) => {
  if (token) {
    console.log('Setting Authorization header', token);
    apiAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('Removing Authorization header');
    delete apiAxiosInstance.defaults.headers.common['Authorization'];
  }
};
 */
export interface InputError {
  name: string;
  errors: string[];
}

export type HttpError = AxiosError<{
  message: string;
  errors?: InputError[];
  code: string;
  error?: string;
}>;

apiAxiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiAxiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError<HttpError>) => {
    const status = error.response?.status;
    console.log('Error response status:', status);
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = LOGIN_EXPIRED_SESSION_ROUTE;
    }

    if (status && status !== 401) {
      let backendMsg: string = 'Ocurrió un error inesperado';
      const data = error.response?.data as { message?: string; error?: string } | undefined;
      if (data) {
        backendMsg = data.message || data.error || backendMsg;
      }
      message.error(backendMsg);
    }
    return Promise.reject(error);
  },
);
