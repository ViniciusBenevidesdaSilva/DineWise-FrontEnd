import { notFound } from 'next/navigation';

import { Login } from '@/feature/usuario/login';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

export default async function AdminAuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = (await Login.auth()) as ExtendedSession;

  if (!session?.user?.isAdmin) {
    return notFound();
  }

  return children;
}
