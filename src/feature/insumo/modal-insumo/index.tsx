'use client';

import React, { ReactElement, useState } from 'react';

import { Insumo } from '@/entities/insumo';
import { Modal } from '@/shared/ui/components/modal';

import { FormInsumo } from './ui/form-insumo';

type TModalInsumoProps = {
  triggerButton: ReactElement;
  insumo?: Insumo;
};

export function ModalInsumo({ triggerButton, insumo = undefined }: Readonly<TModalInsumoProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toogleIsOpen() {
    setIsOpen(!isOpen);
  }

  const TriggerButton = React.cloneElement(triggerButton, {
    onClick: toogleIsOpen,
  });

  return (
    <>
      {TriggerButton}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={insumo ? 'Editar insumo' : 'Novo insumo'}>
        <FormInsumo insumo={insumo} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
