import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../../types/user.interface';
import { AuthContext } from './auth-context';
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from '../../routes/routes';
import { apiAxiosInstance, setAuthToken, type IApiError } from '../../api/config';
import type { ILoginForm } from '../../modules/auth/login/login.interfaces';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(() => {
    const stored = localStorage.getItem('app_user');
    return stored ? (JSON.parse(stored) as IUser) : null;
  });

  useEffect(() => {
    const interceptor = apiAxiosInstance.interceptors.response.use(
      res => res,
      (err: IApiError) => {
        if (err.status === 401) {
          setAuthToken(null);
          setUser(null);
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
    const stored = localStorage.getItem('app_user');
    if (stored) {
      const parsed = JSON.parse(stored) as IUser;
      setAuthToken(parsed.token);
      apiAxiosInstance
        .get<IUser>('/auth/me')
        .then(({ data }) => {
          setUser({ ...data, token: parsed.token });
          localStorage.setItem('app_user', JSON.stringify({ ...data, token: parsed.token }));
        })
        .catch(() => {
          setAuthToken(null);
          setUser(null);
          localStorage.removeItem('app_user');
        });
    }
  }, []);

  const login = async ({ email, password }: ILoginForm) => {
    try {
      const { data } = await apiAxiosInstance.post<IUser>('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('app_user', JSON.stringify(data));
      setAuthToken(data.token);
      navigate(DASHBOARD_ROUTE, { replace: true });
    } catch (error) {
      if ((error as IApiError).status === 401) {
        console.error('Invalid credentials');
        alert('Invalid email or password. Please try again.');
      } else {
        alert('An error occurred while logging in. Please try again later.');
        console.error('Login failed', error);
      }
      setUser(null);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('app_user');
    navigate(LOGIN_ROUTE, { replace: true });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
