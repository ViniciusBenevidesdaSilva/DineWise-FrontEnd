import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function requestPasswordReset(usuario: Usuario): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify(usuario);
    await HTTPRequest.putWithoutResponse(`${env.API_URL}/v1/Usuario/RequestPasswordReset`, body);
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
