'use server';

import { revalidateTag } from 'next/cache';

import { TFetchResponse } from '@/entities/fetch-response';
import { Insumo } from '@/entities/insumo';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function updateInsumo(insumo: Insumo, token?: string): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify(insumo);
    await HTTPRequest.putWithoutResponse(`${env.API_URL}/v1/insumo/${insumo.id}`, body, {
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
