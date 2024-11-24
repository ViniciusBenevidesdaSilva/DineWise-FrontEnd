import { Cardapio } from '@/entities/cardapio';
import { Preparo } from '@/entities/preparo';

import { CardCardapio } from './card-cardapio';

type TGridCardapioProps = {
  cardapios: Cardapio[];
  preparos: Preparo[];
};

export function GridCardapio({ cardapios, preparos }: Readonly<TGridCardapioProps>) {
  return (
    <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {cardapios.map((cardapio) => (
        <CardCardapio key={String(cardapio.date)} cardapio={cardapio} preparos={preparos} />
      ))}
    </div>
  );
}
