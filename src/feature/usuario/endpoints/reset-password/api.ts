import { TFetchResponse } from '@/entities/fetch-response';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function resetPassword(novaSenha: string, token: string): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify({ novaSenha });
    await HTTPRequest.putWithoutResponse(
      `${env.API_URL}/v1/Usuario/ResetPassword?token=${token}`,
      body
    );
    return {
      error: false,
      errorMessage: '',
    };
  } catch (error) {
    return {
      error: true,
      errorMessage: String(error),
    };
  }
}
