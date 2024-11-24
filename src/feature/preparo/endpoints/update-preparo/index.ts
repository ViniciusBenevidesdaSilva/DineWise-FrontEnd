import { getSession } from 'next-auth/react';

import { TFetchResponse } from '@/entities/fetch-response';
import { Preparo } from '@/entities/preparo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { updatePreparo } from './api';

function UpdatePreparoFactory() {
  async function exec(preparo: Preparo): Promise<TFetchResponse> {
    const session = (await getSession()) as ExtendedSession;
    const data = await updatePreparo(preparo, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const UpdatePreparo = UpdatePreparoFactory();
