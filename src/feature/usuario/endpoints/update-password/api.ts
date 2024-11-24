import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function updateUsuarioPassword(
  usuario: Usuario,
  token?: string
): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify(usuario);
    await HTTPRequest.putWithoutResponse(
      `${env.API_URL}/v1/usuario/updatepassword/${usuario.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
