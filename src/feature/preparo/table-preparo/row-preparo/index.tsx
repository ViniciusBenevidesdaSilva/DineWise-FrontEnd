import { Pencil, Trash2 } from 'lucide-react';

import { Insumo } from '@/entities/insumo';
import { Preparo } from '@/entities/preparo';
import { DeletePreparo } from '@/feature/preparo/endpoints/delete-preparo';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { formatNumberToString } from '@/shared/utils/format-number';

import { ModalPreparo } from '../../modal-preparo';

type TRowPreparoProps = {
  preparo: Preparo;
  insumos: Insumo[];
};

export function RowPreparo({ preparo, insumos }: Readonly<TRowPreparoProps>) {
  const { setModalIsOpen } = useModalStore();

  async function deletePreparo() {
    const response = await DeletePreparo.exec(preparo.id ?? 0);

    setModalIsOpen(response.error ? ModalType.Error : ModalType.Success);
  }

  function handleDeletePreparo() {
    setModalIsOpen(ModalType.ConfirmDelete, true, deletePreparo);
  }

  const hasTipoAQPC = !preparo.tiposAQPC || preparo.tiposAQPC.length === 0;

  return (
    <tr className='text-functional-heavy-dark border-b bg-functional-soft-lightest hover:bg-functional-soft-dark'>
      <td scope='row' className='text-center px-6 py-4 truncate capitalize max-w-[100vw]'>
        {preparo.nome}
      </td>
      <td className='text-center px-6 py-4'>{`${formatNumberToString(preparo.porcaoIndividualQuantidade, 1)} ${preparo.porcaoIndividualUnidadeMedidaNome ?? ''}`}</td>
      <td className='text-center px-6 py-4'>
        {formatNumberToString(preparo.porcaoIndividualCalorias, 1)}
      </td>
      <td className={`${hasTipoAQPC ? 'text-center' : 'text-start'} px-6 py-4`}>
        {hasTipoAQPC ? '-' : preparo.tiposAQPC?.map((tipo) => <p key={tipo.id}>- {tipo.nome}</p>)}
      </td>
      <td className='text-center px-6 py-4'>{preparo.insumos?.length}</td>
      <td className='text-center px-6 py-4 text-functional-heavy-medium'>
        <ModalPreparo
          insumos={insumos}
          preparo={preparo}
          triggerButton={
            <button aria-label={`Editar ${preparo.nome}`}>
              <Pencil
                size={20}
                className='my-2 lg:my-0 mx-4 transition-colors duration-200 ease-in-out hover:text-brand-primary-dark'
              />
            </button>
          }
        />

        <button aria-label={`Excluir ${preparo.nome}`} onClick={handleDeletePreparo}>
          <Trash2
            size={20}
            className='my-2 lg:my-0 mx-4 transition-colors duration-200 ease-in-out hover:text-feedback-danger-dark'
          />
        </button>
      </td>
    </tr>
  );
}
