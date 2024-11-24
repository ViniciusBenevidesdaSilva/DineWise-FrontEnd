import { TFetchResponse } from '@/entities/fetch-response';

export type TResponseAuth = TFetchResponse & {
  data: AuthData;
  token: string;
};

export type AuthData = {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};
