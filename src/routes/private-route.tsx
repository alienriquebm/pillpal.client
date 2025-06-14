import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_EXPIRED_SESSION_ROUTE } from './routes';
import useVerifyToken from '@/hooks/use-validate-token';
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/loading-screen';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { isVerifyingToken } = useVerifyToken();

  if (isVerifyingToken) {
    return <LoadingScreen />;
  }

  return user ? <>{children}</> : <Navigate to={LOGIN_EXPIRED_SESSION_ROUTE} replace />;
};
