import type { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from './routes';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to={DASHBOARD_ROUTE} replace />;
};
