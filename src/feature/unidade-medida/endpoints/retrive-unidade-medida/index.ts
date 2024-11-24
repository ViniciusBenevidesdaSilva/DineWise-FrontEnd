import { fetchUnidadeMedida } from './api';
import { TRetriveUnidadeMedida } from './types';

function RetriveUnidadeMedidaFactory() {
  async function exec(token?: string): Promise<TRetriveUnidadeMedida> {
    const data = await fetchUnidadeMedida(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveUnidadeMedida = RetriveUnidadeMedidaFactory();
