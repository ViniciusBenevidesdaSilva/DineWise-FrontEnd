'use client';

import { useEffect, useState } from 'react';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormProfile } from './hook/use-form-profile';

type TFormProfileProps = {
  usuario?: Usuario;
};

export function FormProfile({ usuario = undefined }: Readonly<TFormProfileProps>) {
  const { setModalIsOpen } = useModalStore();
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { handleSubmit, getFieldProps, isValid, isSubmitting, hasChanged } = useFormProfile({
    usuario,
    setFormStatus,
  });

  useEffect(() => {
    if (formStatus?.hasError) {
      setModalIsOpen(ModalType.Error);
    } else if (formStatus?.hasError === false) {
      setModalIsOpen(ModalType.Success);
    }
  }, [formStatus, setModalIsOpen]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <InputText
        {...getFieldProps('nome')}
        label='Nome'
        placeholder='Digite seu nome'
        type='text'
      />
      <InputText
        {...getFieldProps('email')}
        label='Email'
        placeholder='Digite seu email'
        type='email'
      />
      <ButtonPrimary
        type='submit'
        disabled={!hasChanged || !isValid || isSubmitting}
        className='self-center mt-2 md:mt-6'
      >
        Salvar dados
      </ButtonPrimary>
    </form>
  );
}
