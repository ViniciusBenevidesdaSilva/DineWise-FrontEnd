import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import AuthenticatedLayout from '@/app/(pages)/(authenticated)/layout';
import HomeLayout from '@/app/(pages)/(home)/layout';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';

type TSection404Props = {
  userLogged: boolean;
};

function Section404({ userLogged }: Readonly<TSection404Props>) {
  return (
    <section className='min-h-full flex flex-col justify-center items-center gap-8 text-functional-heavy-dark'>
      <h1 className='text-3xl lg:text-4xl font-medium'>Erro 404</h1>
      <Image
        src='/images/not-found.png'
        alt='Desenho de um chef com uma placa de erro 404, não encontrado'
        width={300}
        height={300}
      />
      <p className='text-lg'>A página que você procura não foi encontrada.</p>
      <Link
        href={userLogged ? '/cardapio' : '/'}
        title='Link para Home do DineWise'
        className='text-brand-primary-dark text-lg underline'
      >
        Voltar para a tela inicial
      </Link>
    </section>
  );
}

export default async function Error404() {
  const session = await getServerSession(nextAuthOptions);

  return session ? (
    <AuthenticatedLayout>
      <Section404 userLogged={true} />
    </AuthenticatedLayout>
  ) : (
    <HomeLayout showAnimation={false}>
      <Section404 userLogged={false} />
    </HomeLayout>
  );
}
