import { TFetchResponse } from '@/entities/fetch-response';
import { Usuario } from '@/entities/usuario';

export type TRetriveConta = TFetchResponse & {
  data?: Usuario;
};
