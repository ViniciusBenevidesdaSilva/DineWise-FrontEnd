import { getSession } from 'next-auth/react';

import { TFetchResponse } from '@/entities/fetch-response';
import { Insumo } from '@/entities/insumo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { updateInsumo } from './api';

function UpdateInsumoFactory() {
  async function exec(insumo: Insumo): Promise<TFetchResponse> {
    const session = (await getSession()) as ExtendedSession;
    const data = await updateInsumo(insumo, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const UpdateInsumo = UpdateInsumoFactory();
