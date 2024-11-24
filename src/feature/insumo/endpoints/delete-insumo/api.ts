'use server';

import { revalidateTag } from 'next/cache';

import { TFetchResponse } from '@/entities/fetch-response';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function deleteInsumo(id: number, token?: string): Promise<TFetchResponse> {
  try {
    await HTTPRequest.remove(`${env.API_URL}/v1/insumo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag('retrive-insumo');
    revalidateTag('retrive-preparo');
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
