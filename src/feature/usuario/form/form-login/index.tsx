'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FormStatus } from '@/entities/form-status';
import { Usuario } from '@/entities/usuario';
import { ButtonPrimary } from '@/widgets/buttons/button-primary';
import { InputCheckbox } from '@/widgets/inputs/input-checkbox';
import { InputText } from '@/widgets/inputs/input-text';

import { useFormLogin } from './hook/use-form-login';

type TFormLoginProps = {
  usuario?: Usuario;
};

export function FormLogin({ usuario = undefined }: Readonly<TFormLoginProps>) {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const { getFieldProps, handleSubmit, isValid, isSubmitting } = useFormLogin({
    usuario,
    setFormStatus,
  });

  useEffect(() => {
    if (formStatus?.hasError === false) {
      router.push('/insumo');
    }
  }, [formStatus, router]);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-5/6'>
      <InputText {...getFieldProps('email')} placeholder='Email' type='email' />
      <InputText {...getFieldProps('senha')} placeholder='Senha' type='password' />

      <div className='flex flex-col md:flex-row gap-3 justify-center items-center m-4 mx-2'>
        <InputCheckbox
          {...getFieldProps('lembrarUsuario')}
          id='lembrarUsuario'
          label='Lembrar de mim'
        />
        <Link
          href='/recuperar-senha'
          title='Link para página de Recuperar Senha do DineWise'
          className='text-sm lg:text-base font-medium text-functional-heavy-medium text-end w-full'
        >
          Esqueceu a senha?
        </Link>
      </div>

      <ButtonPrimary
        type='submit'
        disabled={!isValid || isSubmitting || formStatus?.hasError === false}
        className='self-center mt-6 w-1/2'
      >
        Login
      </ButtonPrimary>
    </form>
  );
}
