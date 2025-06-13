import { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import { apiAxiosInstance } from '../api/config';
import type { IUser } from '../types/user.interface';

function useVerifyToken() {
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);
  const { updateLoggedUser } = useAuth();

  useEffect(() => {
    const tokenExists = localStorage.getItem('token');
    if (tokenExists && isVerifyingToken) {
      apiAxiosInstance
        .get<IUser>('/auth/me')
        .then(({ data }) => {
          const user = data;
          if (user) {
            updateLoggedUser?.(user);
            setIsVerifyingToken(false);
          }
        })
        .catch(() => {
          setIsVerifyingToken(false);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          updateLoggedUser?.(null);
        });
    } else {
      setIsVerifyingToken(false);
    }
  }, [isVerifyingToken, updateLoggedUser]);
  return { isVerifyingToken, setIsVerifyingToken };
}

export default useVerifyToken;
