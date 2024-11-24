import { getSession } from 'next-auth/react';

import { TFetchResponse } from '@/entities/fetch-response';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { deletePreparo } from './api';

function DeletePreparoFactory() {
  async function exec(id: number): Promise<TFetchResponse> {
    const session = (await getSession()) as ExtendedSession;
    const data = await deletePreparo(id, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const DeletePreparo = DeletePreparoFactory();
