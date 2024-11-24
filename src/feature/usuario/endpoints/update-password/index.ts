import { getSession } from 'next-auth/react';

import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';

import { ExtendedSession } from '../../login/session/types';
import { updateUsuarioPassword } from './api';

function UpdateUsuarioPasswordFactory() {
  async function exec(usuario: Usuario): Promise<TFetchResponse> {
    const session = (await getSession()) as ExtendedSession;
    const data = await updateUsuarioPassword(usuario, session?.accessToken);
    return data;
  }

  return {
    exec,
  };
}

export const UpdateUsuarioPassword = UpdateUsuarioPasswordFactory();
