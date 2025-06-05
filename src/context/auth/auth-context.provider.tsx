import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../../types/user.interface';
import { AuthContext } from './auth-context';
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from '../../routes/routes';
import { apiAxiosInstance, setAuthToken, type IApiError } from '../../api/config';
import type { ILoginForm } from '../../modules/auth/login/login.interfaces';
import type { IAuthResponse } from './auth-context.interfaces';
import { message } from 'antd';

const LOCAL_STORAGE_USER = 'user';
const LOCAL_STORAGE_TOKEN = 'token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const notifiedRef = useRef(false);
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER);
    return storedUser ? (JSON.parse(storedUser) as IUser) : null;
  });

  useEffect(() => {
    const interceptor = apiAxiosInstance.interceptors.response.use(
      res => res,
      (err: IApiError) => {
        if (err.status === 401) {
          setAuthToken(null);
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER);
          localStorage.removeItem(LOCAL_STORAGE_TOKEN);
          navigate(LOGIN_ROUTE, { replace: true });
        }
        return Promise.reject(err);
      },
    );
    return () => {
      apiAxiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (storedToken) {
      setAuthToken(storedToken);
      apiAxiosInstance
        .get<IUser>('/auth/me')
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          setAuthToken(null);
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER);
          localStorage.removeItem(LOCAL_STORAGE_TOKEN);
          if (!notifiedRef.current) {
            message.error('Session expired. Please log in again.');
            notifiedRef.current = true;
          }
        });
    }
  }, []);

  const login = async ({ email, password }: ILoginForm) => {
    try {
      const { data } = await apiAxiosInstance.post<IAuthResponse>('/auth/login', {
        email,
        password,
      });
      const { token, user } = data;
      setUser(user);
      setAuthToken(token);
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      navigate(DASHBOARD_ROUTE, { replace: true });
    } catch (error) {
      if ((error as IApiError).status === 401) {
        message.error('Invalid email or password. Please try again.');
      } else {
        message.error('An error occurred while logging in. Please try again later.');
      }
      setUser(null);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    navigate(LOGIN_ROUTE, { replace: true });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
