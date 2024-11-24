'use client';

import React, { ReactElement, useState } from 'react';

import { Insumo } from '@/entities/insumo';
import { Preparo } from '@/entities/preparo';
import { Modal } from '@/shared/ui/components/modal';

import { FormPreparo } from './ui/form-preparo';

type TModalPreparoProps = {
  triggerButton: ReactElement;
  preparo?: Preparo;
  insumos: Insumo[];
};

export function ModalPreparo({
  triggerButton,
  preparo = undefined,
  insumos,
}: Readonly<TModalPreparoProps>) {
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

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={preparo ? 'Editar preparo' : 'Novo preparo'}
      >
        <FormPreparo preparo={preparo} insumos={insumos} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
