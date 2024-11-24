import { TFetchResponse } from '@/entities/fetch-response';

import { resetPassword } from './api';

function ResetPasswordFactory() {
  async function exec(novaSenha: string, token: string): Promise<TFetchResponse> {
    const data = await resetPassword(novaSenha, token);
    return data;
  }

  return {
    exec,
  };
}

export const ResetPassword = ResetPasswordFactory();
