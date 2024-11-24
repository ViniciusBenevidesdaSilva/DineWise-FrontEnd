import { getSession } from 'next-auth/react';

import { Insumo } from '@/entities/insumo';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { saveInsumo } from './api';
import { TSaveInsumo } from './types';

function SaveInsumoFactory() {
  async function exec(insumo: Insumo): Promise<TSaveInsumo> {
    const session = (await getSession()) as ExtendedSession;
    const data = await saveInsumo(insumo, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const SaveInsumo = SaveInsumoFactory();
