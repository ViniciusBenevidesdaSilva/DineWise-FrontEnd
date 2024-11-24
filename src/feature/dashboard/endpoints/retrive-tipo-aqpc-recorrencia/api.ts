import { TipoAQPCRecorrencia } from '@/entities/dashboard/tipo-aqpc-recorrencia';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveTipoAQPCRecorrencia } from './types';

export async function fetchTipoAQPCRecorrencia(
  token?: string
): Promise<TRetriveTipoAQPCRecorrencia> {
  try {
    const data = await HTTPRequest.get<TipoAQPCRecorrencia>(
      `${env.API_URL}/v1/Grafico/GetRecorrenciaTipoAQPC`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['retrive-dashboard-tipo-aqpc-recorrencia'],
        },
      }
    );

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
