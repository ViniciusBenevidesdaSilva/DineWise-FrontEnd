import { TipoAQPCRecorrencia } from '@/entities/dashboard/tipo-aqpc-recorrencia';
import { TFetchResponse } from '@/entities/fetch-response';

export type TRetriveTipoAQPCRecorrencia = TFetchResponse & {
  data?: TipoAQPCRecorrencia;
};
