import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveInsumo } from '@/feature/insumo/endpoints/retrive-insumo';
import { ModalInsumo } from '@/feature/insumo/modal-insumo';
import { SectionInsumo } from '@/feature/insumo/section-insumo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';
import { ButtonCreate } from '@/widgets/buttons/button-create';

export const metadata: Metadata = {
  title: 'Insumos',
  description:
    'Gerencie os insumos necessários para a execução do seu restaurante. Cadastre seu nome, preço e unidade de medida vinculados e os exclua conforme necessidade!',
};

export default async function Insumos() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const insumosData = await RetriveInsumo.exec((session as ExtendedSession)?.accessToken);

  if (!insumosData || insumosData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Insumos</h1>
        <ModalInsumo triggerButton={<ButtonCreate />} />
      </div>

      <SectionInsumo insumos={insumosData.data} />
    </>
  );
}
