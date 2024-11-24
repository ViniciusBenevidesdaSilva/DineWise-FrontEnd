import { Usuario } from '@/entities/usuario';

import { saveUsuario } from './api';
import { TSaveUsuario } from './type';

function SaveUsuarioFactory() {
  async function exec(usuario: Usuario): Promise<TSaveUsuario> {
    const data = await saveUsuario(usuario);
    return data;
  }

  return {
    exec,
  };
}

export const SaveUsuario = SaveUsuarioFactory();
