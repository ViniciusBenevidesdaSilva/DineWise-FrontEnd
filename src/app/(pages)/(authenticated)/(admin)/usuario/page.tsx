import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveUsuario } from '@/feature/usuario/endpoints/retrive-usuario';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { SectionUsuario } from '@/feature/usuario/section-usuario';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';

export const metadata: Metadata = {
  title: 'Usuários',
  description:
    'Gerencie os usuários que acessam seu site, garantindo privilégios de administrador conforme necessidade!',
};

export default async function Insumos() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const usuariosData = await RetriveUsuario.exec((session as ExtendedSession)?.accessToken);

  if (!usuariosData || usuariosData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Usuários</h1>
      </div>

      <SectionUsuario usuarios={usuariosData.data} />
    </>
  );
}
