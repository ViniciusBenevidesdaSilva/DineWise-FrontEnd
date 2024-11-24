import { TipoAQPCMensal } from '@/entities/dashboard/tipo-aqpc-mensal';
import { TFetchResponse } from '@/entities/fetch-response';

export type TRetriveTipoAQPCMensal = TFetchResponse & {
  data: TipoAQPCMensal[];
};
