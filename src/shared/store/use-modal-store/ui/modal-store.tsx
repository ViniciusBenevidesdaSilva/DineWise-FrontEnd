'use client';

import { Modal } from '@/shared/ui/components/modal';

import { ModalType } from '../consts/modal-types';
import { useModalStore } from '..';

import { ConfirmDeleteModal } from './confirm-delete-modal';
import { ErrorModal } from './error-modal';
import { SuccessModal } from './success-modal';

export function ModalStore() {
  const { modalType, isModalOpen, execAction, setModalIsOpen } = useModalStore();

  let content;
  switch (modalType) {
    case ModalType.Success:
      content = <SuccessModal />;
      break;
    case ModalType.Error:
      content = <ErrorModal />;
      break;
    case ModalType.ConfirmDelete:
      content = (
        <ConfirmDeleteModal
          confirmAction={execAction}
          cancelAction={() => setModalIsOpen(undefined, false)}
        />
      );
      break;
    default:
      return null;
  }

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={(isOpen) => setModalIsOpen(modalType, isOpen)}
      title={modalType}
    >
      {content}
    </Modal>
  );
}
