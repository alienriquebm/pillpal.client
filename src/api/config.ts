import axios, { AxiosError } from 'axios';

const API_URL: string =
  (import.meta.env.VITE_PUBLIC_API as string | undefined) || 'http://localhost:4000';

export const apiAxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiAxiosInstance.defaults.headers.common['Authorization'];
  }
};

export interface IApiError {
  status: number;
  message: string;
}

interface IApiErrorPayload {
  message?: string;
}

apiAxiosInstance.interceptors.response.use(
  res => res,
  (err: AxiosError<IApiErrorPayload>) => {
    if (err.response) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data?.message || err.message,
      } as IApiError);
    }
    return Promise.reject({ status: 0, message: err.message });
  },
);
