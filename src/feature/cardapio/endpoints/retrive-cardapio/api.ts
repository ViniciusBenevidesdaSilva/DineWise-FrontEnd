'use server';

import { Cardapio } from '@/entities/cardapio';
import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';
import { formatDateString } from '@/shared/utils/date-methods';

import { TRetriveCardapio } from './types';

export async function fetchCardapio(
  startDate: Date,
  endDate: Date,
  token?: string
): Promise<TRetriveCardapio> {
  try {
    const data = await HTTPRequest.get<Cardapio[]>(
      `${env.API_URL}/v1/Refeicao/GetByDateRange?dataInicial=${formatDateString(startDate)}&dataFinal=${formatDateString(endDate)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['retrive-cardapio'],
        },
      }
    );

    const convertedData = data.map((cardapio) => ({
      ...cardapio,
      id: cardapio.refeicao?.id,
      data: new Date(cardapio.date),
      preparosIds: cardapio.refeicao?.preparosIds,
    }));

    return {
      data: convertedData,
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
