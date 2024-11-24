import { Usuario } from '@/entities/usuario';

import { RowUsuario } from './row-usuario';

type TTableUsuarioProps = {
  usuarios: Usuario[];
};

export function TableUsuario({ usuarios }: Readonly<TTableUsuarioProps>) {
  if (usuarios.length === 0) {
    return (
      <div className='p-4 bg-functional-soft-lightest text-center text-functional-heavy-medium'>
        <p>Nenhum Usuário encontrado</p>
      </div>
    );
  }

  return (
    <table className='w-full lg:table-fixed text-sm text-functional-heavy-dark'>
      <thead className='text-xs uppercase bg-functional-soft-darkest'>
        <tr>
          <th scope='col' className='text-center px-6 py-3 max-w-[100vw]'>
            Nome
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Email
          </th>
          <th scope='col' className='text-center px-6 py-3'>
            Administrador
          </th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <RowUsuario key={usuario.id} usuario={usuario} />
        ))}
      </tbody>
    </table>
  );
}
