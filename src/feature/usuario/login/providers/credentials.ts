import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/infra/env';
import { HTTPRequest } from '@/shared/adapters/http-request';

import { AuthData, TResponseAuth } from './types';

export const Credentials = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: { label: 'email', type: 'email' },
    password: { label: 'senha', type: 'password' },
  },
  async authorize(credentials) {
    try {
      const response = await HTTPRequest.post<TResponseAuth>(
        `${env.API_URL}/v1/token`,
        JSON.stringify(credentials),
        {
          withCredentials: true,
        }
      );

      if (response.error || !response.token)
        throw new Error(response.errorMessage || 'Unauthorized');

      return {
        ...response.data,
        accessToken: response.token,
      } as AuthData;
    } catch (error) {
      throw error ?? new Error('Unauthorized');
    }
  },
});
