import Link from 'next/link';

import { FormRegister } from '@/feature/usuario/form/form-register';
import { LogoLayout } from '@/shared/ui/layout/logoLayout';

export default function Register() {
  return (
    <LogoLayout>
      <section className='h-full max-h-full flex flex-col justify-around items-center'>
        <h1 className='font-semibold text-2xl lg:text-4xl text-functional-heavy-dark py-4'>
          Cadastre-se
        </h1>
        <FormRegister />
        <p className='text-functional-heavy-medium py-6'>
          Já possuí uma conta?{' '}
          <Link
            href='/login'
            title='Link para a página de Login do DineWise'
            className='text-brand-primary-dark no-underline'
          >
            Entrar
          </Link>
        </p>
      </section>
    </LogoLayout>
  );
}
