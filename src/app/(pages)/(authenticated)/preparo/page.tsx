import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveInsumo } from '@/feature/insumo/endpoints/retrive-insumo';
import { RetrivePreparo } from '@/feature/preparo/endpoints/retrive-preparo';
import { ModalPreparo } from '@/feature/preparo/modal-preparo';
import { SectionPreparo } from '@/feature/preparo/section-preparo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';
import { ButtonCreate } from '@/widgets/buttons/button-create';

export const metadata: Metadata = {
  title: 'Preparos',
  description:
    'Gerencie os preparos e pratos presentes nos seu restaurante. Cadastre seus dados básicos e crie suas receitas deliciosas, vinculando com seus tipos AQPCs para análises futuras!',
};

export default async function Preparos() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const [insumosData, preparosData] = await Promise.all([
    RetriveInsumo.exec((session as ExtendedSession)?.accessToken),
    RetrivePreparo.exec((session as ExtendedSession)?.accessToken),
  ]);

  if (!insumosData || insumosData.error || !preparosData || preparosData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Preparos</h1>
        <ModalPreparo insumos={insumosData.data} triggerButton={<ButtonCreate />} />
      </div>

      <SectionPreparo insumos={insumosData.data} preparos={preparosData.data} />
    </>
  );
}
