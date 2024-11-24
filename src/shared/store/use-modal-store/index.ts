import { create } from 'zustand';

import { ModalType } from './consts/modal-types';

type ModalStore = {
  modalType?: ModalType;
  isModalOpen: boolean;
  execAction?: () => void;
  setModalIsOpen: (type?: ModalType, isOpen?: boolean, action?: () => void) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalType: undefined,
  isModalOpen: false,
  setModalIsOpen: (type = undefined, isOpen = true, action = undefined) =>
    set({
      modalType: isOpen ? type : undefined,
      isModalOpen: isOpen,
      execAction: action,
    }),
}));
