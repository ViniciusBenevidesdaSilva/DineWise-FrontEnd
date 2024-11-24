import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveCompra } from '@/feature/compra/endpoints/retrive-compra';
import { SectionCompra } from '@/feature/compra/section-compra';
import { RetriveInsumo } from '@/feature/insumo/endpoints/retrive-insumo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';

export const metadata: Metadata = {
  title: 'Compras',
  description:
    'Analise as previsões de compra do sistema com base nos cardápios já cadastrados. Verifique os gastos estimados por insumo ou por data',
};

export default async function Insumos() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const [insumosData, comprasData] = await Promise.all([
    RetriveInsumo.exec((session as ExtendedSession)?.accessToken),
    RetriveCompra.exec((session as ExtendedSession)?.accessToken),
  ]);

  if (!insumosData || insumosData.error || !comprasData || comprasData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Compras</h1>
      </div>

      <SectionCompra insumos={insumosData.data} compras={comprasData.data} />
    </>
  );
}
