import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RootRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return null;
}
