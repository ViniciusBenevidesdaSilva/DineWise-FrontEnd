'use server';

import { revalidateTag } from 'next/cache';

import { Insumo } from '@/entities/insumo';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TSaveInsumo } from './types';

export async function saveInsumo(insumo: Insumo, token?: string): Promise<TSaveInsumo> {
  try {
    const body = JSON.stringify(insumo);
    const data = await HTTPRequest.post<Insumo>(`${env.API_URL}/v1/insumo`, body, {
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
