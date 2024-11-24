import { Insumo } from '@/entities/insumo';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveInsumo } from './types';

export async function fetchInsumo(token?: string): Promise<TRetriveInsumo> {
  try {
    const data = await HTTPRequest.get<Insumo[]>(`${env.API_URL}/v1/insumo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-insumo'],
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
