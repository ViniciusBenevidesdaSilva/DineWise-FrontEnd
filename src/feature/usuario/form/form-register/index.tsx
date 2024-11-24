'use client';

import { useEffect, useState } from 'react';

import { signIn } from 'next-auth/react';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormRegister } from './hook/use-form-register';

type TFormRegisterProps = {
  usuario?: Usuario;
};

export function FormRegister({ usuario = undefined }: Readonly<TFormRegisterProps>) {
  const { setModalIsOpen } = useModalStore();
  const [shouldLogin, setShouldLogin] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { getFieldProps, handleSubmit, isValid, isSubmitting, values } = useFormRegister({
    usuario,
    setFormStatus,
  });

  useEffect(() => {
    if (formStatus?.hasError) {
      setModalIsOpen(ModalType.Error);
    } else if (formStatus?.hasError === false) {
      setShouldLogin(true);
    }
  }, [formStatus, setModalIsOpen]);

  useEffect(() => {
    if (shouldLogin) {
      signIn('credentials', {
        email: values.email,
        password: values.senha,
        redirectUrl: false,
      });
      setShouldLogin(false);
    }
  }, [shouldLogin, values.email, values.senha]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-5/6'>
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
      <InputText
        {...getFieldProps('senha')}
        label='Senha'
        placeholder='Digite sua senha'
        type='password'
        showPasswordTips
      />
      <InputText
        {...getFieldProps('confirmarSenha')}
        label='Confirmar senha'
        placeholder='Confirme sua senha'
        type='password'
      />

      <ButtonPrimary
        type='submit'
        disabled={!isValid || isSubmitting || formStatus?.hasError === false}
        className='self-center mt-6 w-1/2'
      >
        Criar conta
      </ButtonPrimary>
    </form>
  );
}
