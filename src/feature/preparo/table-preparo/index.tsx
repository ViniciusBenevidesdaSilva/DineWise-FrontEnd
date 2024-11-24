import { Insumo } from '@/entities/insumo';
import { Preparo } from '@/entities/preparo';

import { RowPreparo } from './row-preparo';

type TTablePreparoProps = {
  preparos: Preparo[];
  insumos: Insumo[];
};

export function TablePreparo({ preparos, insumos }: Readonly<TTablePreparoProps>) {
  if (preparos.length === 0) {
    return (
      <div className='p-4 bg-functional-soft-lightest text-center text-functional-heavy-medium'>
        <p>Nenhum Preparo encontrado</p>
      </div>
    );
  }

  return (
    <table className='w-full lg:table-auto text-sm text-functional-heavy-dark'>
      <thead className='text-xs uppercase bg-functional-soft-darkest'>
        <tr>
          <th scope='col' className='text-center px-6 py-3 max-w-[100vw]'>
            Nome
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Porção Individual
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Calorias (kcal)
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Tipos AQPC
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Quantidade de Insumos
          </th>
          <th scope='col' className='text-center px-6 py-3 w-1/5'>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {preparos.map((preparo) => (
          <RowPreparo key={preparo.id} preparo={preparo} insumos={insumos} />
        ))}
      </tbody>
    </table>
  );
}
