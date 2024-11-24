import { Compra } from '@/entities/compra';
import { TFetchResponse } from '@/entities/fetch-response';

export type TRetriveCompra = TFetchResponse & {
  data: Compra[];
};
