import { notFound } from 'next/navigation';

import { Login } from '@/feature/usuario/login';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { CardapioStore } from '@/shared/store/use-cardapio-store/ui/cardapio-store';
import { TipoAQPCStore } from '@/shared/store/use-tipo-aqpc-store/ui/tipo-aqpc-store';
import { UnidadeMedidaStore } from '@/shared/store/use-unidade-medida-store/ui/unidade-medida-store';
import { SideBar } from '@/shared/ui/components/sidebar';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = (await Login.auth()) as ExtendedSession;

  if (!session) {
    return notFound();
  }

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <UnidadeMedidaStore userToken={session?.accessToken} />
      <TipoAQPCStore userToken={session?.accessToken} />
      <CardapioStore userToken={session?.accessToken} />

      <header className='h-auto lg:h-full w-full lg:w-1/4'>
        <SideBar isAdmin={session.user?.isAdmin === true} />
      </header>
      <main className='container w-full h-full lg:h-screen lg:overflow-y-scroll lg:w-3/4 mx-auto p-4 lg:py-8 lg:px-12'>
        {children}
      </main>
      <footer></footer>
    </div>
  );
}
