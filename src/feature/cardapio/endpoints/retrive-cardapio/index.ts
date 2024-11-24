import { fetchCardapio } from './api';
import { TRetriveCardapio } from './types';

function RetriveCardapioFactory() {
  async function exec(startDate: Date, endDate: Date, token?: string): Promise<TRetriveCardapio> {
    const data = await fetchCardapio(startDate, endDate, token);
    return data;
  }

  return {
    exec,
  };
}

export const RetriveCardapio = RetriveCardapioFactory();
