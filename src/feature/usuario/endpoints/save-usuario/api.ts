import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TSaveUsuario } from './type';

export async function saveUsuario(usuario: Usuario): Promise<TSaveUsuario> {
  try {
    const body = JSON.stringify(usuario);
    const data = await HTTPRequest.post<Usuario>(`${env.API_URL}/v1/usuario`, body);

    return {
      data: data,
      error: false,
      errorMessage: '',
    };
  } catch (error) {
    return {
      data: undefined,
      error: true,
      errorMessage: String(error),
    };
  }
}
