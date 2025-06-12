import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '../../types/user.interface';
import { AuthContext } from './auth-context';
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from '../../routes/routes';
import { apiAxiosInstance } from '../../api/config';
import type { ILoginForm } from '../../modules/auth/login/login.interfaces';
import type { IAuthResponse } from './auth-context.interfaces';

const LOCAL_STORAGE_USER = 'user';
const LOCAL_STORAGE_TOKEN = 'token';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER);
    return storedUser ? (JSON.parse(storedUser) as IUser) : null;
  });
  const updateLoggedUser = (user: IUser | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER);
    }
  };

  const login = async ({ email, password }: ILoginForm) => {
    try {
      const { data } = await apiAxiosInstance.post<IAuthResponse>('/auth/login', {
        email,
        password,
      });
      const { token, user } = data;
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      navigate(DASHBOARD_ROUTE, { replace: true });
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    navigate(LOGIN_ROUTE, { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
