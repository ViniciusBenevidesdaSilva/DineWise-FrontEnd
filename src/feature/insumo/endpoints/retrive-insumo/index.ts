import { fetchInsumo } from './api';
import { TRetriveInsumo } from './types';

function RetriveInsumoFactory() {
  async function exec(token?: string): Promise<TRetriveInsumo> {
    const data = await fetchInsumo(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveInsumo = RetriveInsumoFactory();
