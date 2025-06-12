import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useCheckSessionExpired() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const shownRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get('error') === 'session_expired' && !shownRef.current) {
      message.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      shownRef.current = true;
      params.delete('error');
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [search, navigate]);

  return null;
}
