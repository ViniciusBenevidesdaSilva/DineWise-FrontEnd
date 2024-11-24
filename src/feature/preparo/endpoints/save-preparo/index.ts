import { getSession } from 'next-auth/react';

import { Preparo } from '@/entities/preparo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { savePreparo } from './api';
import { TSavePreparo } from './types';

function SavePreparoFactory() {
  async function exec(preparo: Preparo): Promise<TSavePreparo> {
    const session = (await getSession()) as ExtendedSession;
    const data = await savePreparo(preparo, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const SavePreparo = SavePreparoFactory();
