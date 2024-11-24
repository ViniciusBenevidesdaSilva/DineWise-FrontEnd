import { CircleX } from 'lucide-react';

type TCloseModalButtonProps = {
  closeModal: () => void;
};

export function CloseModalButton({ closeModal }: Readonly<TCloseModalButtonProps>) {
  return (
    <button
      aria-label='Fechar modal'
      onClick={closeModal}
      className='text-functional-heavy-medium hover:text-functional-soft-dark'
    >
      <CircleX
        size={26}
        className='fill-functional-soft-light hover:fill-functional-heavy-medium'
      />
    </button>
  );
}
