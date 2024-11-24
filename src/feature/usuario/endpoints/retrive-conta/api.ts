import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveConta } from './types';

export async function fetchConta(usuarioId?: string, token?: string): Promise<TRetriveConta> {
  try {
    const data = await HTTPRequest.get<Usuario>(`${env.API_URL}/v1/usuario/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-conta'],
      },
    });

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
