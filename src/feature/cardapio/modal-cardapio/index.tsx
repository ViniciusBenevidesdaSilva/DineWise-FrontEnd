'use client';

import React, { ReactElement, useState } from 'react';

import { Cardapio } from '@/entities/cardapio';
import { Preparo } from '@/entities/preparo';
import { Modal } from '@/shared/ui/components/modal';

import { FormCardapio } from './ui/form-cardapio';

type TModalCardapioProps = {
  triggerButton: ReactElement;
  cardapio?: Cardapio;
  preparos: Preparo[];
};

export function ModalCardapio({
  triggerButton,
  cardapio = undefined,
  preparos,
}: Readonly<TModalCardapioProps>) {
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
        title={cardapio ? 'Editar cardápio' : 'Novo cardápio'}
      >
        <FormCardapio cardapio={cardapio} preparos={preparos} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
