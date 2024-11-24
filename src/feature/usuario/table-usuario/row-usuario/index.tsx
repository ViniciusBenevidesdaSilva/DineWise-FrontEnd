import { useState } from 'react';

import { Usuario } from '@/entities/usuario';
import { useModalStore } from '@/shared/store/use-modal-store';
import { ModalType } from '@/shared/store/use-modal-store/consts/modal-types';
import { InputCheckbox } from '@/widgets/inputs/input-checkbox';

import { UpdateUsuarioRole } from '../../endpoints/update-role';

type TRowUsuarioProps = {
  usuario: Usuario;
};

export function RowUsuario({ usuario }: Readonly<TRowUsuarioProps>) {
  const { setModalIsOpen } = useModalStore();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  async function updateUsuarioRole(isAdmin: boolean) {
    setIsUpdating(true);

    usuario.isAdmin = isAdmin;
    const response = await UpdateUsuarioRole.exec(usuario);

    setModalIsOpen(response.error ? ModalType.Error : ModalType.Success);

    setIsUpdating(false);
  }

  return (
    <tr className='text-functional-heavy-dark border-b bg-functional-soft-lightest hover:bg-functional-soft-dark'>
      <td scope='row' className='text-center px-6 py-4 max-w-[50vw] truncate'>
        {usuario.nome}
      </td>
      <td className='text-center px-6 py-4'>{usuario.email}</td>
      <td className='flex justify-center px-6 py-4'>
        <InputCheckbox
          id={`atualizar-funcao-usuario-${usuario.id}`}
          name={`atualizar-funcao-usuario-${usuario.id}`}
          disabled={isUpdating}
          checked={usuario.isAdmin}
          onChange={(e) => updateUsuarioRole(e.target.checked)}
        />
      </td>
    </tr>
  );
}
