import { getSession } from 'next-auth/react';

import { Cardapio } from '@/entities/cardapio';
import { TFetchResponse } from '@/entities/fetch-response';
import { ExtendedSession } from '@/feature/usuario/login/session/types';

import { updateCardapio } from './api';

function UpdateCardapioFactory() {
  async function exec(cardapio: Cardapio): Promise<TFetchResponse> {
    const session = (await getSession()) as ExtendedSession;
    const data = await updateCardapio(cardapio, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const UpdateCardapio = UpdateCardapioFactory();
