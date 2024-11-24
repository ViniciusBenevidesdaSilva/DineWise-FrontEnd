import { TipoAQPCMensal } from '@/entities/dashboard/tipo-aqpc-mensal';
import { TipoAQPCRecorrencia } from '@/entities/dashboard/tipo-aqpc-recorrencia';
import { Card } from '@/shared/ui/components/card';

import { KPIFutureExpenses } from '../graphics/kpi-future-expenses';
import { MonthlyAQPCType } from '../graphics/monthly-aqpc-type';
import { PercentageAQPCType } from '../graphics/percentage-aqpc-type';

type TSectionDashboardProps = {
  tipoAQPCMensal: TipoAQPCMensal[];
  tipoAQPCRecorrencia: TipoAQPCRecorrencia;
  valorCompraMensal: number;
};

export function SectionDashboard({
  tipoAQPCMensal,
  tipoAQPCRecorrencia,
  valorCompraMensal,
}: Readonly<TSectionDashboardProps>) {
  return (
    <section className='w-full h-full md:max-h-[90%] flex flex-col gap-8 md:gap-16 my-6 md:my-2'>
      <Card title='Acompanhamento mensal' divClassName='h-2/5 w-full'>
        <MonthlyAQPCType tipoAQPCMensal={tipoAQPCMensal} className='h-full w-full' />
      </Card>
      <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
        <Card title='Comparativo tipos AQPC' divClassName='h-full md:h-fit md:w-1/2'>
          <PercentageAQPCType tipoAQPCRecorrencia={tipoAQPCRecorrencia} className='w-full h-full' />
        </Card>
        <Card
          title='Previsão Gastos'
          divClassName='h-full md:w-1/2'
          className='flex items-center justify-center text-center'
        >
          <KPIFutureExpenses valorCompraMensal={valorCompraMensal} />
        </Card>
      </div>
    </section>
  );
}
