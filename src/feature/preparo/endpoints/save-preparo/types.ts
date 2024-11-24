import { TFetchResponse } from '@/entities/fetch-response';
import { Preparo } from '@/entities/preparo';

export type TSavePreparo = TFetchResponse & {
  data?: Preparo;
};
