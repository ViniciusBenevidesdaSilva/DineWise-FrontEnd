import { Metadata } from 'next';

import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Acesse a Política de Privacidade da empresa DineWise, validando a coleta, uso, segurança e compartilhamento de dados e informações.',
  keywords: ['DineWise', 'Gestão', 'Restaurantes', 'Política de Privacidade'],
};

export default function PoliticaPrivacidade() {
  return (
    <section className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl lg:text-3xl font-semibold'>Política de privacidade - DineWise</h1>
        <p>
          A sua privacidade é muito importante para nós. Para garantir que você se sinta seguro ao
          utilizar nossos serviços, queremos explicar de forma transparente como coletamos, usamos e
          protegemos suas informações pessoais.
        </p>
        <p>
          A <span className='text-brand-primary-darkest font-medium'>DineWise</span> tem o
          compromisso de proteger sua privacidade e garantir a segurança dos seus dados pessoais.
          Este documento descreve como coletamos, utilizamos, armazenamos e protegemos suas
          informações, em conformidade com a Lei Geral de Proteção de Dados{' '}
          <span className='font-medium'>(LGPD - Lei nº 13.709/2018)</span>.
        </p>
        <p>
          Esta Política de Privacidade foi desenvolvida como parte de um projeto acadêmico realizado
          por alunos da Faculdade Engenheiro Salvador Arena, como parte da conclusão do 8º semestre
          do curso de Engenharia de Computação, no 2º semestre de 2024. O principal objetivo deste
          trabalho é aplicar os conhecimentos adquiridos ao longo do curso, com foco em fins
          educacionais e sem fins lucrativos.
        </p>
      </div>

      <h2 className='text-xl lg:text-2xl font-semibold'>1. Coleta de Informações</h2>
      <p>
        Coletamos informações pessoais que você nos fornece diretamente, como nome, endereço de
        e-mail e dados relacionados ao uso do sistema. Essas informações são coletadas apenas quando
        você as insere diretamente em nossos formulários ou ao interagir com os serviços que
        disponibilizamos.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>2. Uso das Informações</h2>
      <p>
        As informações coletadas são utilizadas exclusivamente para a melhoria da plataforma, para a
        análise de como os usuários interagem com os serviços oferecidos, e para fornecer suporte
        técnico adequado. Nenhuma informação pessoal será compartilhada com terceiros sem o seu
        consentimento explícito.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>3. Segurança das Informações</h2>
      <p>
        Empregamos práticas adequadas para proteger suas informações pessoais de acesso não
        autorizado, divulgação ou alteração. No entanto, é importante ressaltar que, como qualquer
        sistema de tecnologia, nenhuma medida de segurança é completamente infalível.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>4. Compartilhamento de Dados</h2>
      <p>
        Os dados pessoais fornecidos não serão compartilhados com terceiros, exceto quando
        necessário para cumprir com a lei ou para proteger os direitos, propriedade ou segurança de
        outros usuários ou da equipe envolvida no projeto. Os dados compartilhados com a instuição
        de ensino citada anteriormente serão feitos de forma anônima.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>
        5. Cookies e Tecnologias de Rastreamento
      </h2>
      <p>
        Utilizamos cookies para:
        <ul>
          <li className='flex gap-4 items-center'>
            <Check size={18} />
            Manter a sessão do usuário logado;
          </li>
          <li className='flex gap-4 items-center'>
            <Check size={18} />
            Garantir a funcionalidade do site;
          </li>
          <li className='flex gap-4 items-center'>
            <Check size={18} />
            Melhorar a experiência do usuário;
          </li>
          <li className='flex gap-4 items-center'>
            <Check size={18} />
            Oferecer funcionalidades personalizadas.
          </li>
        </ul>
        Você pode configurar seu navegador para bloquear cookies, mas isso pode limitar algumas
        interações do site.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>6. Alterações nesta Política</h2>
      <p>
        A presente Política de Privacidade pode ser atualizada de tempos em tempos para refletir
        mudanças nos nossos processos ou por questões legais. Caso haja modificações, a nova versão
        será publicada neste espaço.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>7. Consentimento</h2>
      <p>
        Ao utilizar nossos serviços, você concorda com os termos desta Política de Privacidade. Se
        não concordar com qualquer parte dela, solicitamos que não utilize o sistema.
      </p>

      <h2 className='text-xl lg:text-2xl font-semibold'>8. Contato</h2>
      <p>
        Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco por meio
        do e-mail <span className='text-brand-primary-darkest'>dinewise@gmail.com</span>
      </p>
    </section>
  );
}
