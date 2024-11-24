import { Pencil, Trash2 } from 'lucide-react';

import { Insumo } from '@/entities/insumo';
import { ModalInsumo } from '@/feature/insumo/modal-insumo';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { formatNumberToString } from '@/shared/utils/format-number';

import { DeleteInsumo } from '../../endpoints/delete-insumo';

type TRowInsumoProps = {
  insumo: Insumo;
};

export function RowInsumo({ insumo }: Readonly<TRowInsumoProps>) {
  const { setModalIsOpen } = useModalStore();

  async function deleteInsumo() {
    const response = await DeleteInsumo.exec(insumo.id ?? 0);

    setModalIsOpen(response.error ? ModalType.Error : ModalType.Success);
  }

  function handleDeleteInsumo() {
    setModalIsOpen(ModalType.ConfirmDelete, true, deleteInsumo);
  }

  return (
    <tr className='text-functional-heavy-dark border-b bg-functional-soft-lightest hover:bg-functional-soft-dark'>
      <td scope='row' className='text-center px-6 py-4 max-w-[50vw] truncate'>
        {insumo.nome}
      </td>
      <td className='text-center px-6 py-4'>{formatNumberToString(insumo.preco)}</td>
      <td className='text-center px-6 py-4'>{insumo.unidadeMedidaNome}</td>
      <td className='text-center px-6 py-4 text-functional-heavy-medium flex justify-center gap-8'>
        <ModalInsumo
          insumo={insumo}
          triggerButton={
            <button aria-label={`Editar ${insumo.nome}`}>
              <Pencil
                size={20}
                className='transition-colors duration-200 ease-in-out hover:text-brand-primary-dark'
              />
            </button>
          }
        />

        <button aria-label={`Excluir ${insumo.nome}`} onClick={handleDeleteInsumo}>
          <Trash2
            size={20}
            className='transition-colors duration-200 ease-in-out hover:text-feedback-danger-dark'
          />
        </button>
      </td>
    </tr>
  );
}
