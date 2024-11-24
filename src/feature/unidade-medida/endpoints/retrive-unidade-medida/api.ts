import { UnidadeMedida } from '@/entities/unidade-medida';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveUnidadeMedida } from './types';

export async function fetchUnidadeMedida(token?: string): Promise<TRetriveUnidadeMedida> {
  try {
    const data = await HTTPRequest.get<UnidadeMedida[]>(`${env.API_URL}/v1/unidademedida`, {
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
