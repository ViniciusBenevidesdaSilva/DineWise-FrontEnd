import { Cardapio } from '@/entities/cardapio';
import { TFetchResponse } from '@/entities/fetch-response';

export type TRetriveCardapio = TFetchResponse & {
  data: Cardapio[];
};
