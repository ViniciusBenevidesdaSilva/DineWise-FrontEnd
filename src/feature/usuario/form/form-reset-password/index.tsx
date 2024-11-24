'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormStatus } from '@/entities/form-status';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormResetPassword } from './hook/use-form-reset-password';

type TFormResetPasswordProps = {
  token: string;
};

export function FormResetPassword({ token }: Readonly<TFormResetPasswordProps>) {
  const router = useRouter();
  const { setModalIsOpen } = useModalStore();
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { handleSubmit, getFieldProps, isValid, isSubmitting } = useFormResetPassword({
    token,
    setFormStatus,
  });

  useEffect(() => {
    if (formStatus?.hasError) {
      setModalIsOpen(ModalType.Error);
    } else if (formStatus?.hasError === false) {
      setModalIsOpen(ModalType.Success);
      router.push('/');
    }
  }, [formStatus, router, setModalIsOpen]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col lg:w-1/2'>
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
        disabled={!isValid || isSubmitting}
        className='self-center mt-2 md:mt-6'
      >
        Atualizar senha
      </ButtonPrimary>
    </form>
  );
}
