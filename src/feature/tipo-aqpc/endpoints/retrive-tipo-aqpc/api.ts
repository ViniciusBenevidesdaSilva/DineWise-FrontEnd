import { TipoAQPC } from '@/entities/tipo-aqpc';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveTipoAQPC } from './types';

export async function fetchTipoAQPC(token?: string): Promise<TRetriveTipoAQPC> {
  try {
    const data = await HTTPRequest.get<TipoAQPC[]>(`${env.API_URL}/v1/TipoAQPC`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
