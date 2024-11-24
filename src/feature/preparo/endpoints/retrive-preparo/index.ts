import { fetchPreparo } from './api';
import { TRetrivePreparo } from './types';

function RetrivePreparoFactory() {
  async function exec(token?: string): Promise<TRetrivePreparo> {
    const data = await fetchPreparo(token);
    return data;
  }

  return {
    exec,
  };
}

export const RetrivePreparo = RetrivePreparoFactory();
