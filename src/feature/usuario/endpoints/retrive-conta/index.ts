import { fetchConta } from './api';
import { TRetriveConta } from './types';

function RetriveContaFactory() {
  async function exec(userId?: string | null, token?: string): Promise<TRetriveConta> {
    const data = await fetchConta(userId ?? undefined, token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveConta = RetriveContaFactory();
