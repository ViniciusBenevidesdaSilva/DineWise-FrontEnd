import { Compra } from '@/entities/compra';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveCompra } from './types';

export async function fetchCompra(token?: string): Promise<TRetriveCompra> {
  try {
    const data = await HTTPRequest.get<Compra[]>(`${env.API_URL}/v1/Compra`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-compra'],
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
