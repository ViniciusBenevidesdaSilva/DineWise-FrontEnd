import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { RetriveTipoAQPCMensal } from '@/feature/dashboard/endpoints/retrive-tipo-aqpc-mensal';
import { RetriveTipoAQPCRecorrencia } from '@/feature/dashboard/endpoints/retrive-tipo-aqpc-recorrencia';
import { RetriveValorCompraMensal } from '@/feature/dashboard/endpoints/retrive-valor-compra-mensal';
import { SectionDashboard } from '@/feature/dashboard/section-dashboard';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Visualize de forma gráfica os dados cadastrados no sistema. Analise e obtenha insights valiosos para te auxiliar na tomada de decisão estratégica',
};

export default async function Dashboards() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const [tipoAQPCMensalData, tipoAQPCRecorrenciaData, valorCompraMensalData] = await Promise.all([
    RetriveTipoAQPCMensal.exec((session as ExtendedSession)?.accessToken),
    RetriveTipoAQPCRecorrencia.exec((session as ExtendedSession)?.accessToken),
    RetriveValorCompraMensal.exec((session as ExtendedSession)?.accessToken),
  ]);

  if (
    !tipoAQPCMensalData ||
    tipoAQPCMensalData.error ||
    !tipoAQPCRecorrenciaData ||
    tipoAQPCRecorrenciaData.error ||
    !tipoAQPCRecorrenciaData.data ||
    !valorCompraMensalData ||
    valorCompraMensalData.error ||
    !valorCompraMensalData.data
  ) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>Dashboards</h1>
      </div>

      <SectionDashboard
        tipoAQPCMensal={tipoAQPCMensalData.data}
        tipoAQPCRecorrencia={tipoAQPCRecorrenciaData.data}
        valorCompraMensal={valorCompraMensalData.data}
      />
    </>
  );
}
