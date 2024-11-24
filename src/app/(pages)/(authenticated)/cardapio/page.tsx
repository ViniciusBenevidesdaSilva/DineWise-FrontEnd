import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { CalendarCardapio } from '@/feature/cardapio/calendar-cardapio';
import { SectionCardapio } from '@/feature/cardapio/section-cardapio';
import { RetrivePreparo } from '@/feature/preparo/endpoints/retrive-preparo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import Error500 from '@/shared/ui/components/error-500';

export const metadata: Metadata = {
  title: 'Cardápio',
  description:
    'Realize o planejamento dos cardápios semanais do seu restaurante. Visualize os preparos previstos para cada dia e acompanhe os tipos AQPC presentes em cada refeição!',
};

export default async function Preparos() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    return notFound();
  }

  const preparosData = await RetrivePreparo.exec((session as ExtendedSession)?.accessToken);

  if (!preparosData || preparosData.error) {
    return <Error500 />;
  }

  return (
    <>
      <div className='flex flex-col gap-8 md:flex-row items-center justify-between'>
        <h1 className='text-3xl font-semibold self-start'>Cardápio</h1>
        <CalendarCardapio userToken={(session as ExtendedSession)?.accessToken} />
      </div>

      <SectionCardapio preparos={preparosData.data} />
    </>
  );
}
