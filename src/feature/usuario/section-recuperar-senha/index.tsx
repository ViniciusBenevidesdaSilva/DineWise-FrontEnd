'use client';

import { useSearchParams } from 'next/navigation';

import { FormRequestPasswordReset } from '@/feature/usuario/form/form-request-password-reset';

import { FormResetPassword } from '../form/form-reset-password';

type TSectionFormChangePasswordProps = {
  title: string;
  message: string;
  formComponent: React.ReactNode;
};

function SectionFormChangePassword({
  title,
  message,
  formComponent,
}: Readonly<TSectionFormChangePasswordProps>) {
  return (
    <>
      <div className='flex flex-col gap-2 lg:gap-6 py-2 lg:py-4'>
        <h1 className='font-semibold text-2xl lg:text-4xl text-functional-heavy-dark'>{title}</h1>
        <p className='text-functional-heavy-medium'>{message}</p>
      </div>
      {formComponent}
    </>
  );
}

export function SectionRecoverPassword() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  return (
    <>
      {token ? (
        <SectionFormChangePassword
          title='Altere sua senha!'
          message='Preencha o formulário abaixo com sua nova senha!'
          formComponent={<FormResetPassword token={token ?? ''} />}
        />
      ) : (
        <SectionFormChangePassword
          title='Recupere sua senha!'
          message='Informe seu email para te encaminharmos as instruções necessárias para recuperar sua senha!'
          formComponent={<FormRequestPasswordReset />}
        />
      )}
    </>
  );
}
