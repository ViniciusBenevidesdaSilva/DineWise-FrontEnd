import { TFetchResponse } from '@/entities/fetch-response';
import { Preparo } from '@/entities/preparo';

export type TRetrivePreparo = TFetchResponse & {
  data: Preparo[];
};
