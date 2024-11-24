import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveUsuario } from './types';

export async function fetchUsuario(token?: string): Promise<TRetriveUsuario> {
  try {
    const data = await HTTPRequest.get<Usuario[]>(`${env.API_URL}/v1/usuario`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-usuario'],
      },
    });

    return {
      data: data,
      error: false,
      errorMessage: '',
    };
  } catch (error) {
    return {
      data: [],
      error: true,
      errorMessage: String(error),
    };
  }
}
