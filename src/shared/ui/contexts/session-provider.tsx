'use client';

import { SessionProvider } from 'next-auth/react';

type TNextAuthSessionProviderProps = {
  children: React.ReactNode;
};

export function NextAuthSessionProvider({ children }: Readonly<TNextAuthSessionProviderProps>) {
  return <SessionProvider>{children}</SessionProvider>;
}
