import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from './routes';
import { useAuth } from '@/hooks/use-auth';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to={DASHBOARD_ROUTE} replace />;
};
