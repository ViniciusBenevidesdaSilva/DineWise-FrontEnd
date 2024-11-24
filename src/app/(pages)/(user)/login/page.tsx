import { Suspense } from 'react';

import Link from 'next/link';

import { FormLogin } from '@/feature/usuario/form/form-login';
import { UseListeningLoginError } from '@/shared/ui/hooks/use-listening-login-error';
import { LogoLayout } from '@/shared/ui/layout/logoLayout';

export default function Login() {
  return (
    <LogoLayout>
      <section className='h-full max-h-full flex flex-col justify-around items-center'>
        <h1 className='font-semibold text-2xl lg:text-4xl text-functional-heavy-dark'>
          Bem Vindo!
        </h1>
        <FormLogin />
        <p className='text-functional-heavy-medium py-6'>
          Não possuí uma conta?{' '}
          <Link
            href='/cadastro'
            title='Link para página de Cadastro do DineWise'
            className='text-brand-primary-dark no-underline'
          >
            Cadastre-se
          </Link>
        </p>
      </section>
      <Suspense fallback={null}>
        <UseListeningLoginError />
      </Suspense>
    </LogoLayout>
  );
}
