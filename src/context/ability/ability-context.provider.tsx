import React, { useMemo } from 'react';
import { AbilityContext } from './ability-context';
import { defineAbilityFor } from './ability';
import useVerifyToken from '@/hooks/use-verify-token';
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/loading-screen';

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { isVerifyingToken } = useVerifyToken();
  const { user } = useAuth();
  const ability = useMemo(() => defineAbilityFor(user), [user]);
  if (isVerifyingToken) {
    return <LoadingScreen />;
  }
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
}
