import { fetchValorCompraMensal } from './api';
import { TRetriveValorCompraMensal } from './types';

function RetriveValorCompraMensalFactory() {
  async function exec(token?: string): Promise<TRetriveValorCompraMensal> {
    const data = await fetchValorCompraMensal(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveValorCompraMensal = RetriveValorCompraMensalFactory();
