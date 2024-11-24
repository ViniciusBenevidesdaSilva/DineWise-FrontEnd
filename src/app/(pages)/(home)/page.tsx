import Image from 'next/image';

import { BookOpenText, Check, Milk, ShoppingCart, Utensils } from 'lucide-react';

import { LinkPrimary } from '@/widgets/links/link-primary';

type THomeCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function HomeCard({ title, description, icon }: Readonly<THomeCardProps>) {
  return (
    <div
      className={`flex flex-col justify-center gap-4 text-center border border-functional-heavy-lightest rounded-2xl text-functional-heavy-dark px-6 py-4 transition-all duration-300 hover:scale-105`}
    >
      <div className='flex justify-center gap-4'>
        <span className='text-brand-primary-darkest'>{icon}</span>
        <h3 className='font-medium'>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}

const homeCardsElements = [
  {
    title: 'Insumos',
    description: 'Cadastre os insumos mais comuns do seu restaurante',
    icon: <Milk size={20} />,
  },
  {
    title: 'Preparos',
    description: 'Monte os pratos principais que serão servidos mensalmente',
    icon: <Utensils size={20} />,
  },
  {
    title: 'Cardápios',
    description: 'Realize o planejamento do seu cardápio, levando em conta o método AQPC',
    icon: <BookOpenText size={20} />,
  },
  {
    title: 'Compras',
    description: 'Visualize sua necessidade de compras mensal, com base nos dados cadastrados',
    icon: <ShoppingCart size={20} />,
  },
];

export default function Home() {
  return (
    <div className='flex flex-col gap-12'>
      <section className='flex flex-col lg:flex-row gap-8 justify-center items-center h-1/2 text-functional-heavy-dark'>
        <div className='basis-1/2 lg:text-end flex flex-col gap-12'>
          <h1 className='animate-fade-up font-semibold text-2xl md:text-3xl lg:text-4xl'>
            Simplifique a gestão <br />
            do seu Restaurante
          </h1>
          <p className='animate-fade-up animate-delay-500 text-functional-heavy-medium text-md lg:text-xl'>
            Aumente a eficiência do seu <span className='font-medium'>restaurante</span> com um
            sistema integrado, oferecendo suporte desde a montagem do{' '}
            <span className='font-medium'>cardápio</span>, aplicação do método{' '}
            <span className='font-medium'>AQPC</span> e controle de necessidade de compras
          </p>
          <div className='self-center lg:self-end lg:mr-20 animate-fade-up animate-delay-500'>
            <LinkPrimary
              href='/login'
              title='Link para página de Login do DineWise'
              className='!rounded-3xl !px-8 !py-3'
            >
              Acesse sua conta
            </LinkPrimary>
          </div>
        </div>
        <div className='animate-fade-up animate-delay-300'>
          <Image
            src='/images/home/chef-restaurante-vector-1.png'
            title='Desenho de um chef de cozinha em seu restaurante'
            alt='Desenho de um chef de cozinha em seu restaurante'
            width={400}
            height={400}
          />
        </div>
      </section>

      <section className='animate-fade-up animate-delay-700 flex flex-col items-center'>
        <h2 className='text-functional-heavy-medium font-semibold text-xl lg:text-2xl'>
          Adapte o fluxo de trabalho com a sua realidade
        </h2>
        <div className='w-full grid gap-8 lg:gap-20 justify-items-center lg:grid-flow-col py-8 px-6'>
          {homeCardsElements.map((item) => (
            <HomeCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </section>

      <section className='animate-fade-up animate-delay-1000 flex flex-col lg:flex-row gap-8 justify-center items-center h-1/2 text-functional-heavy-dark'>
        <Image
          src='/images/home/chef-rating-vector-2.png'
          title='Desenho de um chef de cozinha avaliando um restaurante em seu celular'
          alt='Desenho de um chef de cozinha avaliando um restaurante em seu celular'
          width={300}
          height={300}
        />
        <div className='basis-1/2 text-start flex flex-col gap-12'>
          <h2 className='font-semibold text-2xl md:text-3xl lg:text-4xl'>
            Aumente o engajamento e a credibilidade da sua Empresa
          </h2>
          <p className='text-functional-heavy-medium text-md lg:text-xl'>
            Promova um ambiente mais saudável aplicando a metodologia{' '}
            <span className='font-medium'>AQPC</span>. Verifique seus indicadores mensais e garanta
            uma alimentação balanceada.
          </p>
        </div>
      </section>

      <section className='animate-fade-up animate-delay-1000 flex flex-col items-center h-1/2 text-functional-heavy-dark gap-4'>
        <h2 className='font-semibold text-2xl md:text-3xl lg:text-4xl'>
          O que a <span className='text-brand-primary-darkest'>DineWise</span> oferece?
        </h2>
        <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4 lg:py-8'>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Painel Gerencial</span>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Cadastro de Insumos</span>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Gestão de Preparos</span>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Manutenção de Cardápios</span>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Necessidade de Compra</span>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='text-feedback-success-dark' />
            <span>Administração de Usuário</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
