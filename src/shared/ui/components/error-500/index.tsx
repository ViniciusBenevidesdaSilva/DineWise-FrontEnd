'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function Error500() {
  return (
    <>
      <Head>
        <title>Erro 500 | DineWise</title>
        <meta
          name='description'
          content='Erro 500 - Estamos enfrentando problemas técnicos no momento.'
        />
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <section className='w-full h-full flex flex-col gap-8 items-center justify-center'>
        <div className='w-full text-center'>
          <h1 className='text-2xl'>Erro 500</h1>
          <p>
            Estamos enfrentando problemas técnicos no momento. Por favor, tente novamente mais
            tarde.
          </p>
        </div>
        <Link
          href='/'
          title='Link para Home do DineWise'
          className='text-brand-primary-dark underline'
        >
          Voltar para a página inicial
        </Link>
      </section>
    </>
  );
}
