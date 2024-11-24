'use server';

import { revalidateTag } from 'next/cache';

import { Cardapio } from '@/entities/cardapio';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TSaveCardapio } from './types';

export async function saveCardapio(cardapio: Cardapio, token?: string): Promise<TSaveCardapio> {
  try {
    const body = JSON.stringify(cardapio);
    const data = await HTTPRequest.post<Cardapio>(`${env.API_URL}/v1/refeicao`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag('retrive-cardapio');
    revalidateTag('retrive-compra');
    revalidateDashboardTags();

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
