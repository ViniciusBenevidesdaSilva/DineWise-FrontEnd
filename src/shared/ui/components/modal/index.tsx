import { useCallback, useEffect, useRef } from 'react';

import { CloseModalButton } from './close-modal-button';

type TModalProps = {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  children: React.ReactNode;
  title?: string;
};

export const Modal = ({ children, isOpen, setIsOpen = undefined, title = '' }: TModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.close();

      if (setIsOpen) setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      openModal();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      closeModal();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!isOpen) return <></>;

  return (
    <dialog
      ref={modalRef}
      className='self-center place-self-center rounded-2xl p-6 max-w-md w-full shadow-lg'
    >
      <div className='flex justify-between items-center pb-6 border-b'>
        <h2 className='text-2xl text-functional-heavy-dark font-medium capitalize'>{title}</h2>
        <CloseModalButton closeModal={closeModal} />
      </div>
      <section className='p-4 pt-6 text-lg'>{children}</section>
    </dialog>
  );
};
