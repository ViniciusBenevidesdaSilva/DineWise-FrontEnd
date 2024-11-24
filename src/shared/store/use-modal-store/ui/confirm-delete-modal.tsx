import { TriangleAlert } from 'lucide-react';

import { ButtonPrimary } from '@/widgets/buttons/button-primary';

type TConfirmDeleteModalProps = {
  confirmAction?: () => void;
  cancelAction?: () => void;
};

export function ConfirmDeleteModal({
  confirmAction,
  cancelAction,
}: Readonly<TConfirmDeleteModalProps>) {
  return (
    <div className='w-full flex flex-col gap-8 items-center text-center'>
      <TriangleAlert size={100} strokeWidth={1} className='text-feedback-danger-dark' />

      <p>Deseja mesmo excluir esse item?</p>

      <div className='flex gap-6 w-3/4'>
        <ButtonPrimary
          aria-label='Excluir registro'
          onClick={confirmAction}
          btnStyle='danger'
          className='flex-1'
        >
          Excluir
        </ButtonPrimary>
        <ButtonPrimary
          btnStyle='secondary'
          aria-label='Cancelar exclusão'
          onClick={cancelAction}
          className='flex-1'
        >
          Cancelar
        </ButtonPrimary>
      </div>
    </div>
  );
}
