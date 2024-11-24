import { fetchCompra } from './api';
import { TRetriveCompra } from './types';

function RetriveCompraFactory() {
  async function exec(token?: string): Promise<TRetriveCompra> {
    const data = await fetchCompra(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveCompra = RetriveCompraFactory();
