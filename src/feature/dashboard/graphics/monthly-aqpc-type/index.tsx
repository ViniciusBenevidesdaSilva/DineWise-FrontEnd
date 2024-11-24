'use client';

import { useEffect, useState } from 'react';

import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, XAxis } from 'recharts';

import { TipoAQPCMensal } from '@/entities/dashboard/tipo-aqpc-mensal';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/components/charts/chart';
import { getMonthName } from '@/shared/utils/date-methods';

const chartConfig = {
  recomendado: {
    label: 'Recomendado',
    color: '#095993',
  },
  controlado: {
    label: 'Controlado',
    color: '#1285D6',
  },
} satisfies ChartConfig;

type TMonthlyAQPCTypeProps = {
  className?: string;
  tipoAQPCMensal: TipoAQPCMensal[];
};

type FormData = {
  mesAno: string;
  recomendado: string;
  controlado: string;
};

export function MonthlyAQPCType({
  className = '',
  tipoAQPCMensal,
}: Readonly<TMonthlyAQPCTypeProps>) {
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    const newFormData: FormData[] = tipoAQPCMensal.map((tipoMensal) => {
      const monthName = getMonthName(new Date(tipoMensal.mes)).toUpperCase();
      return {
        mesAno: monthName,
        recomendado: (tipoMensal.percentuaisTipoAQPC.percentualRecomendadoAtual * 100).toFixed(1),
        controlado: (tipoMensal.percentuaisTipoAQPC.percentualControladoAtual * 100).toFixed(1),
      };
    });

    setFormData(newFormData);
  }, [tipoAQPCMensal]);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart accessibilityLayer data={formData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='mesAno'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent className='bg-functional-soft-lightest' />} />
        <ChartLegend content={<ChartLegendContent />} />
        <ReferenceLine y={20} stroke='#FF8042' strokeDasharray='4 4' />
        <ReferenceLine y={80} stroke='#0088FE' strokeDasharray='4 4' />
        <Bar dataKey='recomendado' radius={4}>
          {formData.map((entry) => (
            <Cell
              key={`cell-${entry.mesAno}-recomendado`}
              fill={
                parseFloat(entry.recomendado) >= 80
                  ? 'var(--brand-primary-darkest)'
                  : 'var(--feedback-danger-dark)'
              }
            />
          ))}
        </Bar>
        <Bar dataKey='controlado' radius={4}>
          {formData.map((entry) => (
            <Cell
              key={`cell-${entry.mesAno}-controlado`}
              fill={
                parseFloat(entry.controlado) <= 20
                  ? 'var(--brand-primary-medium)'
                  : 'var(--feedback-danger-medium)'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
