import { getSession } from 'next-auth/react';

import { Cardapio } from '@/entities/cardapio';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { saveCardapio } from './api';
import { TSaveCardapio } from './types';

function SaveCardapioFactory() {
  async function exec(cardapio: Cardapio): Promise<TSaveCardapio> {
    const session = (await getSession()) as ExtendedSession;
    const data = await saveCardapio(cardapio, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const SaveCardapio = SaveCardapioFactory();
