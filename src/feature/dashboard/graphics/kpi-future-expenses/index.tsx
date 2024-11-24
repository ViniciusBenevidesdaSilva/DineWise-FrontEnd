import { formatNumberToString } from '@/shared/utils/format-number';

type TKPIFutureExpensesProps = {
  className?: string;
  valorCompraMensal: number;
};

export function KPIFutureExpenses({
  className = '',
  valorCompraMensal,
}: Readonly<TKPIFutureExpensesProps>) {
  return (
    <div className={`flex flex-col gap-8 p-8 items-center w-full ${className}`}>
      <p className='animate-fade-up delay-300 text-lg'>
        Previsão de gastos para os próximos 30 dias:
      </p>
      <p className='animate-fade-up delay-500 text-3xl lg:text-5xl font-seconday font-bold text-brand-primary-dark'>
        R$ {formatNumberToString(valorCompraMensal)}
      </p>
    </div>
  );
}
