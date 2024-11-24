import { Preparo } from '@/entities/preparo';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetrivePreparo } from './types';

export async function fetchPreparo(token?: string): Promise<TRetrivePreparo> {
  try {
    const data = await HTTPRequest.get<Preparo[]>(`${env.API_URL}/v1/Preparo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-preparo'],
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
