import { TFetchResponse } from '@/entities/fetch-response';
import { Insumo } from '@/entities/insumo';

export type TRetriveInsumo = TFetchResponse & {
  data: Insumo[];
};
