'use client';

import { useEffect, useState } from 'react';

import { Cell, Pie, PieChart } from 'recharts';

import { TipoAQPCRecorrencia } from '@/entities/dashboard/tipo-aqpc-recorrencia';
import { useWindowDimensions } from '@/shared/hooks/use-window-dimensions';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/components/charts/chart';

const chartConfig = {
  Recomendado: {
    label: 'Recomendado [%]',
    color: '#095993',
  },
  Controlado: {
    label: 'Controlado [%]',
    color: '#1285D6',
  },
} satisfies ChartConfig;

type TPercentageAQPCTypeProps = {
  className?: string;
  tipoAQPCRecorrencia: TipoAQPCRecorrencia;
};

type FormData = {
  name: string;
  value: number;
};

export function PercentageAQPCType({
  className = '',
  tipoAQPCRecorrencia,
}: Readonly<TPercentageAQPCTypeProps>) {
  const { isMobile } = useWindowDimensions();

  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    const newFormData: FormData[] = [
      {
        name: 'Recomendado',
        value: Math.round(tipoAQPCRecorrencia.percentualRecomendado * 100),
      },
      {
        name: 'Controlado',
        value: Math.round(tipoAQPCRecorrencia.percentualControlado * 100),
      },
    ];

    setFormData(newFormData);
  }, [tipoAQPCRecorrencia]);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <PieChart className=''>
        <Pie
          data={formData}
          dataKey='value'
          nameKey='name'
          outerRadius={isMobile ? 60 : 100}
          fill='#8884d8'
          label
          labelLine={false}
        >
          {formData.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={chartConfig[entry.name as keyof typeof chartConfig].color}
            />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent className='bg-functional-soft-lightest' />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
}
