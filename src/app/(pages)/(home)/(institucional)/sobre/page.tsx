import { Metadata } from 'next';

import { Check, CircleUser, Goal, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conheça mais sobre nós',
  description:
    'Conheça a missão, objetivos e fundadores do Dinewise, entendo as tecnologias e conceitos aprendidos com o desenvolvimento desse projeto.',
  keywords: ['DineWise', 'Gestão', 'Restaurantes', 'Sobre'],
};

export default function Sobre() {
  return (
    <section className='flex flex-col gap-6'>
      <div className='animate-fade-up flex flex-col gap-4'>
        <h1 className='text-2xl lg:text-3xl font-semibold'>Sobre o DineWise</h1>
        <p>
          O <span className='font-medium text-brand-primary-darkest'>DineWise</span> é um projeto
          desenvolvido como parte da metodologia Problem-Based Learning (PBL) do 8º semestre de
          Engenharia de Computação, realizado no 2º semestre de 2024 por alunos da Faculdade
          Engenheiro Salvador Arena. Este trabalho representa a culminação de anos de estudo, com o
          objetivo de aplicar e integrar os conhecimentos adquiridos ao longo do curso em uma
          solução prática e funcional.
        </p>
      </div>

      <div className='animate-fade-up animate-delay-300 flex flex-col gap-6'>
        <h2 className='flex items-center gap-6 text-xl lg:text-2xl font-semibold'>
          <GraduationCap /> Conhecimentos Aplicados
        </h2>
        <p>
          Durante o desenvolvimento do{' '}
          <span className='font-medium text-brand-primary-darkest'>DineWise</span>, a equipe
          utilizou uma ampla gama de tecnologias e práticas que refletem o que há de mais moderno no
          mercado de desenvolvimento de software:
        </p>
        <ul className='flex flex-col gap-2'>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Desenvolvimento Front-end com Next.js:</span> Construção
              de uma interface responsiva, performática e otimizada para SEO, garantindo uma
              experiência intuitiva e eficiente para os usuários.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Desenvolvimento Back-end com .NET Web API:</span>{' '}
              Implementação de serviços robustos e escaláveis para atender às necessidades do
              sistema, seguindo princípios de Clean Architecture.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Azure DevOps e Web Apps:</span> Configuração de
              pipelines CI/CD para automação de testes, builds e deploys, além da publicação em
              Azure Web Apps, assegurando a eficiência e a confiabilidade do processo de entrega.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Boas práticas de SEO:</span> Aplicação de estratégias
              para otimização dos motores de busca, garantindo maior visibilidade e acessibilidade
              ao sistema.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Testes Unitários:</span> Garantia de qualidade e
              confiabilidade do código por meio de testes unitários abrangentes, utilizando
              ferramentas e frameworks de mercado.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Metodologias Ágeis:</span> Utilização de Scrum e outras
              práticas ágeis para planejamento, organização e execução do projeto, assegurando
              entregas constantes e melhorias iterativas.
            </p>
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            <p className='basis-11/12'>
              <span className='font-medium'>Normas ISO:</span> Adaptação e aplicação de normas ISO
              relacionadas à qualidade, gestão de projetos e desenvolvimento de TI, assegurando
              conformidade com padrões reconhecidos internacionalmente.
            </p>
          </li>
        </ul>
      </div>

      <div className='animate-fade-up animate-delay-500 flex flex-col gap-6'>
        <h2 className='flex items-center gap-6 text-xl lg:text-2xl font-semibold'>
          <Goal /> Missão
        </h2>
        <p>
          O DineWise foi idealizado para ser uma solução educacional e sem fins lucrativos, com foco
          em demonstrar como a aplicação de conhecimentos técnicos e boas práticas pode transformar
          problemas reais em soluções funcionais. Nossa missão é auxiliar na gestão de restaurantes
          e refeitórios, permitindo o controle de insumos, pratos, cardápios e indicadores de
          qualidade com eficiência.
        </p>
      </div>

      <div className='animate-fade-up animate-delay-700 flex flex-col gap-6'>
        <h2 className='flex items-center gap-6 text-xl lg:text-2xl font-semibold'>
          <CircleUser /> Nossa Equipe
        </h2>
        <p>O projeto foi desenvolvido pelos alunos:</p>
        <ul className='flex flex-col gap-2'>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            Analuz Marin Ramos
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            Marcelly Molinari Marsura
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            Vinícius Benevides da Silva
          </li>
          <li className='flex gap-4 items-center'>
            <Check className='basis-1/12' size={18} />
            Vitor Henrique Carvalho Silva
          </li>
        </ul>
      </div>
    </section>
  );
}
