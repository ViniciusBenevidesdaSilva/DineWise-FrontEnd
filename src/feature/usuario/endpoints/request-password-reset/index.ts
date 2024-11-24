import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';

import { requestPasswordReset } from './api';

function RequestPasswordResetFactory() {
  async function exec(usuario: Usuario): Promise<TFetchResponse> {
    const data = await requestPasswordReset(usuario);
    return data;
  }

  return {
    exec,
  };
}

export const RequestPasswordReset = RequestPasswordResetFactory();
