import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { LOGIN_EXPIRED_SESSION_ROUTE } from './routes';
import useVerifyToken from '../hooks/use-validate-token';
import { Spin } from 'antd';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { isVerifyingToken } = useVerifyToken();

  if (isVerifyingToken) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <Spin />
      </section>
    );
  }

  return user ? <>{children}</> : <Navigate to={LOGIN_EXPIRED_SESSION_ROUTE} replace />;
};
