import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveConta } from '@/feature/usuario/endpoints/retrive-conta';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { SectionConta } from '@/feature/usuario/section-conta';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';

export const metadata: Metadata = {
  title: 'Minha Conta',
  description:
    'Gerencie os dados da sua própria conta, como nome, email, senha e demais preferências de usuário!',
};

export default async function Insumos() {
  const session = (await getServerSession(nextAuthOptions)) as ExtendedSession;

  if (!session) {
    return notFound();
  }

  const contaData = await RetriveConta.exec(session?.user?.id, session?.accessToken);

  if (!contaData || contaData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Minha Conta</h1>
      </div>

      <SectionConta usuario={contaData.data} />
    </>
  );
}
