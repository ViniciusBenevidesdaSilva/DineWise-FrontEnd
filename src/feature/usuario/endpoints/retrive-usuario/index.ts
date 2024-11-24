import { fetchUsuario } from './api';
import { TRetriveUsuario } from './types';

function RetriveUsuarioFactory() {
  async function exec(token?: string): Promise<TRetriveUsuario> {
    const data = await fetchUsuario(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveUsuario = RetriveUsuarioFactory();
