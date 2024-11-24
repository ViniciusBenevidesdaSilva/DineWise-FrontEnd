'use server';

import { revalidateTag } from 'next/cache';

import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

export async function updateUsuarioBasicInfo(
  usuario: Usuario,
  token?: string
): Promise<TFetchResponse> {
  try {
    const body = JSON.stringify(usuario);
    await HTTPRequest.putWithoutResponse(
      `${env.API_URL}/v1/usuario/updatebasicinfo/${usuario.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag('retrive-usuario');
    revalidateTag('retrive-conta');

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
