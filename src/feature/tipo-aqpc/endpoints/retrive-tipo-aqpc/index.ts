import { fetchTipoAQPC } from './api';
import { TRetriveTipoAQPC } from './types';

function RetriveTipoAQPCFactory() {
  async function exec(token?: string): Promise<TRetriveTipoAQPC> {
    const data = await fetchTipoAQPC(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveTipoAQPC = RetriveTipoAQPCFactory();
