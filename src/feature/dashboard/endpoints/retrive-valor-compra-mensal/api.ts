import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveValorCompraMensal } from './types';

export async function fetchValorCompraMensal(token?: string): Promise<TRetriveValorCompraMensal> {
  try {
    const data = await HTTPRequest.get<number>(`${env.API_URL}/v1/Grafico/GetValorCompraMensal`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['retrive-dashboard-valor-compra-mensal'],
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
