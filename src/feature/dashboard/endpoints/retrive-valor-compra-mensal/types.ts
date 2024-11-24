import { TFetchResponse } from '@/entities/fetch-response';

export type TRetriveValorCompraMensal = TFetchResponse & {
  data?: number;
};
