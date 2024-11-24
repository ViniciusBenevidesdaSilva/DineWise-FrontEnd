import { Usuario } from '@/entities/usuario';
import { Card } from '@/shared/ui/components/card';

import { FormProfile } from '../form/form-profile';
import { FormUpdatePassword } from '../form/form-update-password';

type TSectionContaProps = {
  usuario?: Usuario;
};

export function SectionConta({ usuario }: Readonly<TSectionContaProps>) {
  if (!usuario) {
    return <></>;
  }

  return (
    <section className='flex flex-col gap-8 pt-3 px-4 lg:px-0 w-full'>
      <p className='text-functional-heavy-dark'>
        Gerencie suas informações pessoais e dados de acesso.
      </p>
      <div className='w-full h-full flex flex-col lg:flex-row justify-center lg:justify-around items-center lg:items-start gap-8'>
        <Card title='Dados pessoais'>
          <FormProfile usuario={usuario} />
        </Card>
        <Card title='Dados de acesso'>
          <FormUpdatePassword usuario={usuario} />
        </Card>
      </div>
    </section>
  );
}
