import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { jwt } from '@/feature/usuario/login/jwt/jwt';
import { Credentials } from '@/feature/usuario/login/providers/credentials';
import { session } from '@/feature/usuario/login/session/session';
import { env } from '@/infra/env';

export const nextAuthOptions: NextAuthOptions = {
  providers: [Credentials],
  callbacks: {
    jwt,
    session,
    redirect: async ({ baseUrl }) => `${baseUrl}/cardapio`,
  },
  secret: env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};

function auth(req: NextApiRequest, res: NextApiResponse): ReturnType<typeof NextAuth> {
  return NextAuth(req, res, nextAuthOptions);
}

export default auth;
