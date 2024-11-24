'use server';

import { revalidateTag } from 'next/cache';

import { Cardapio } from '@/entities/cardapio';
import { TFetchResponse } from '@/entities/fetch-response';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function updateCardapio(cardapio: Cardapio, token?: string): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify(cardapio);
    await HTTPRequest.putWithoutResponse(`${env.API_URL}/v1/refeicao/${cardapio.id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag('retrive-cardapio');
    revalidateTag('retrive-compra');
    revalidateDashboardTags();

    return {
      error: false,
      errorMessage: '',
    };
  } catch (error) {
    return {
      error: true,
      errorMessage: String(error),
    };
  }
}
