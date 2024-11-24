'use client';

import { useEffect, useState } from 'react';

import { Cardapio } from '@/entities/cardapio';
import { Preparo } from '@/entities/preparo';
import { useCardapioStore } from '@/shared/store/use-cardapio-store';
import { useTipoAQPCStore } from '@/shared/store/use-tipo-aqpc-store';

import { GridCardapio } from '../grid-cardapio';

type TSectionCardapioProps = {
  preparos: Preparo[];
};

export function SectionCardapio({ preparos }: Readonly<TSectionCardapioProps>) {
  const { tiposAQPC } = useTipoAQPCStore();
  const { cardapios } = useCardapioStore();

  const [preparosWithDependencies, setPreparosWithDependencies] = useState<Preparo[]>([]);
  const [cardapiosWithDependencies, setCardapiosWithDependencies] = useState<Cardapio[]>([]);

  useEffect(() => {
    const mapPreparoWithDependencies = (preparo: Preparo): Preparo => {
      const preparoTiposAQPC = getPreparoTiposAQPC(preparo);

      return {
        ...preparo,
        tiposAQPC: preparoTiposAQPC,
      };
    };

    const getPreparoTiposAQPC = (preparo: Preparo) =>
      tiposAQPC.filter((tipo) => preparo.tiposAQPCIds.includes(tipo.id ?? 0));

    const preparosWithDependencies: Preparo[] = preparos.map(mapPreparoWithDependencies);
    setPreparosWithDependencies(preparosWithDependencies);
  }, [preparos, tiposAQPC]);

  useEffect(() => {
    const mapCardapioWithDependencies = (cardapio: Cardapio): Cardapio => {
      const cardapioPreparos = getCardapioPreparos(cardapio);

      return {
        ...cardapio,
        preparos: cardapioPreparos,
      };
    };

    const getCardapioPreparos = (cardapio: Cardapio): Preparo[] => {
      return preparosWithDependencies.filter((preparo) => hasPreparo(cardapio, preparo));
    };

    const hasPreparo = (cardapio: Cardapio, preparo: Preparo) => {
      return cardapio.preparosIds?.some((preparoId) => preparoId === preparo.id);
    };

    const cardapiosWithDependencies: Cardapio[] = cardapios.map(mapCardapioWithDependencies);
    setCardapiosWithDependencies(cardapiosWithDependencies);
  }, [cardapios, preparosWithDependencies, tiposAQPC]);

  return (
    <section className='w-full py-8'>
      <GridCardapio preparos={preparosWithDependencies} cardapios={cardapiosWithDependencies} />
    </section>
  );
}
