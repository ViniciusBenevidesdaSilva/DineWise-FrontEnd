'use client';

import { useEffect } from 'react';

import { useCardapioStore } from '@/shared/store/use-cardapio-store';
import { calculateWeek } from '@/shared/utils/date-methods';

type TCardapioStoreProps = {
  userToken?: string;
};

export function CardapioStore({ userToken = undefined }: Readonly<TCardapioStoreProps>) {
  const { setCardapios } = useCardapioStore();

  useEffect(() => {
    const { weekStart, weekEnd } = calculateWeek(new Date());
    const fetchCardapios = async () => {
      setCardapios(weekStart, weekEnd, userToken);
    };
    fetchCardapios();
  }, [setCardapios, userToken]);

  return <></>;
}
