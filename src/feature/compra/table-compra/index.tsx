import { Compra } from '@/entities/compra';

import { RowCompra } from './row-compra';

type TTableCompraProps = {
  compras: Compra[];
};

export function TableCompra({ compras }: Readonly<TTableCompraProps>) {
  if (compras.length === 0) {
    return (
      <div className='p-4 bg-functional-soft-lightest text-center text-functional-heavy-medium'>
        <p>Nenhuma Compra encontrada</p>
      </div>
    );
  }

  return (
    <table className='w-full lg:table-fixed text-sm text-functional-heavy-dark'>
      <thead className='text-xs uppercase bg-functional-soft-darkest'>
        <tr>
          <th scope='col' className='text-center px-6 py-3 max-w-[100vw]'>
            Data
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Insumo
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Quantidade estimada
          </th>
          <th scope='col' className='text-center px-6 py-3 w-1/5'>
            Preço estimado (R$)
          </th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <RowCompra key={`${compra.insumoId}-${compra.dataLimiteCompra}`} compra={compra} />
        ))}
      </tbody>
    </table>
  );
}
