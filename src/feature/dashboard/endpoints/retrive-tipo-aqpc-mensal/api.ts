import { TipoAQPCMensal } from '@/entities/dashboard/tipo-aqpc-mensal';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TRetriveTipoAQPCMensal } from './types';

export async function fetchTipoAQPCMensal(token?: string): Promise<TRetriveTipoAQPCMensal> {
  try {
    const data = await HTTPRequest.get<TipoAQPCMensal[]>(
      `${env.API_URL}/v1/Grafico/GetTipoAQPCAlertaMensal`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['retrive-dashboard-tipo-aqpc-mensal'],
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
      data: [],
      error: true,
      errorMessage: String(error),
    };
  }
}
