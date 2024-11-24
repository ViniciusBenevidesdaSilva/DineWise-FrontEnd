import { TFetchResponse } from '@/entities/fetch-response';
import { UnidadeMedida } from '@/entities/unidade-medida';

export type TRetriveUnidadeMedida = TFetchResponse & {
  data: UnidadeMedida[];
};
