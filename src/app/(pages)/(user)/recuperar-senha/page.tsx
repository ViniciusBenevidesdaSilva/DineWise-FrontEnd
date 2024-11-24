import { Suspense } from 'react';

import Link from 'next/link';

import { SectionRecoverPassword } from '@/feature/usuario/section-recuperar-senha';
import { LogoLayout } from '@/shared/ui/layout/logoLayout';

export default function RequestPasswordReset() {
  return (
    <LogoLayout>
      <section className='h-full max-h-full flex flex-col items-center justify-around lg:justify-center gap-4 lg:gap-20'>
        <Suspense fallback={null}>
          <SectionRecoverPassword />
        </Suspense>
        <div className='flex flex-col gap-6'>
          <p className='text-functional-heavy-medium text-center'>
            Já possuí uma conta?{' '}
            <Link
              href='/login'
              title='Link para página de Login do DineWise'
              className='text-brand-primary-dark no-underline'
            >
              Entrar
            </Link>
            <br />
            Ou se preferir,{' '}
            <Link
              href='/cadastro'
              title='Link para página de Cadastro do DineWise'
              className='text-brand-primary-dark no-underline'
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </LogoLayout>
  );
}
