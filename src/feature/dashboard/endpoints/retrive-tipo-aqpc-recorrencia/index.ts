import { fetchTipoAQPCRecorrencia } from './api';
import { TRetriveTipoAQPCRecorrencia } from './types';

function RetriveTipoAQPCRecorrenciaFactory() {
  async function exec(token?: string): Promise<TRetriveTipoAQPCRecorrencia> {
    const data = await fetchTipoAQPCRecorrencia(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveTipoAQPCRecorrencia = RetriveTipoAQPCRecorrenciaFactory();
