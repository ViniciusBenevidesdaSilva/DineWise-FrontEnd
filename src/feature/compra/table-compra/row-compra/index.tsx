import { Compra } from '@/entities/compra';
import { formatNumberToString } from '@/shared/utils/format-number';

type TRowCompraProps = {
  compra: Compra;
};

export function RowCompra({ compra }: Readonly<TRowCompraProps>) {
  return (
    <tr className='text-functional-heavy-dark border-b bg-functional-soft-lightest hover:bg-functional-soft-dark'>
      <td scope='row' className='text-center px-6 py-4 max-w-[50vw] truncate'>
        {compra.dataLimiteCompra}
      </td>
      <td className='text-center px-6 py-4'>{compra.insumo?.nome ?? ''}</td>
      <td className='text-center px-6 py-4'>{`${formatNumberToString(compra.quantidadeInsumo)} ${compra.insumo?.unidadeMedidaNome ?? ''}`}</td>
      <td className='text-center px-6 py-4'>{formatNumberToString(compra.precoTotal)}</td>
    </tr>
  );
}
