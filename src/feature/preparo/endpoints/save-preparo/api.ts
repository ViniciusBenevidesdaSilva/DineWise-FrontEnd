'use server';

import { revalidateTag } from 'next/cache';

import { Preparo } from '@/entities/preparo';
import { revalidateDashboardTags } from '@/feature/dashboard/utils/revalidate-dashboard-tags';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { TSavePreparo } from './types';

export async function savePreparo(preparo: Preparo, token?: string): Promise<TSavePreparo> {
  try {
    const body = JSON.stringify(preparo);
    const data = await HTTPRequest.post<Preparo>(`${env.API_URL}/v1/preparo`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
