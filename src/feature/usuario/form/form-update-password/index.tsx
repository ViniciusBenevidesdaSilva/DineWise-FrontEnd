'use client';

import { useEffect, useState } from 'react';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormUpdatePassword } from './hook/use-form-update-password';

type TFormUpdatePasswordProps = {
  usuario?: Usuario;
};

export function FormUpdatePassword({ usuario = undefined }: Readonly<TFormUpdatePasswordProps>) {
  const { setModalIsOpen } = useModalStore();
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { getFieldProps, handleSubmit, resetForm, isValid, isSubmitting, hasChanged } =
    useFormUpdatePassword({
      usuario,
      setFormStatus,
    });

  useEffect(() => {
    if (formStatus?.hasError) {
      setModalIsOpen(ModalType.Error);
    } else if (formStatus?.hasError === false) {
      resetForm();
      setModalIsOpen(ModalType.Success);
    }
  }, [formStatus, resetForm, setModalIsOpen]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <InputText
        {...getFieldProps('novaSenha')}
        label='Nova Senha'
        placeholder='Digite sua nova senha'
        type='password'
        showPasswordTips
      />
      <InputText
        {...getFieldProps('confirmarSenha')}
        label='Confirmar Senha'
        placeholder='Confirme sua nova senha'
        type='password'
      />
      <ButtonPrimary
        type='submit'
        disabled={!hasChanged || !isValid || isSubmitting}
        className='self-center mt-2 md:mt-6'
      >
        Atualizar senha
      </ButtonPrimary>
    </form>
  );
}
