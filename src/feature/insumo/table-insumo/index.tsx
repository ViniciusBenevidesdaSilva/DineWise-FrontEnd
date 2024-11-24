import { Insumo } from '@/entities/insumo';

import { RowInsumo } from './row-insumo';

type TTableInsumoProps = {
  insumos: Insumo[];
};

export function TableInsumo({ insumos }: Readonly<TTableInsumoProps>) {
  if (insumos.length === 0) {
    return (
      <div className='p-4 bg-functional-soft-lightest text-center text-functional-heavy-medium'>
        <p>Nenhum Insumo encontrado</p>
      </div>
    );
  }

  return (
    <table className='w-full lg:table-fixed text-sm text-functional-heavy-dark'>
      <thead className='text-xs uppercase bg-functional-soft-darkest'>
        <tr>
          <th scope='col' className='text-center px-6 py-3 max-w-[100vw]'>
            Nome
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Preço (R$)
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Unidade de Medida
          </th>
          <th scope='col' className='text-center px-6 py-3 w-1/5'>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {insumos.map((insumo) => (
          <RowInsumo key={insumo.id} insumo={insumo} />
        ))}
      </tbody>
    </table>
  );
}
