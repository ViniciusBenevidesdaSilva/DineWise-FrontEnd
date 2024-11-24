import { TFetchResponse } from '@/entities/fetch-response';
import { TipoAQPC } from '@/entities/tipo-aqpc';

export type TRetriveTipoAQPC = TFetchResponse & {
  data: TipoAQPC[];
};
