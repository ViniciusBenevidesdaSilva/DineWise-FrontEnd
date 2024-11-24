import { fetchTipoAQPCMensal } from './api';
import { TRetriveTipoAQPCMensal } from './types';

function RetriveTipoAQPCMensalFactory() {
  async function exec(token?: string): Promise<TRetriveTipoAQPCMensal> {
    const data = await fetchTipoAQPCMensal(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveTipoAQPCMensal = RetriveTipoAQPCMensalFactory();
