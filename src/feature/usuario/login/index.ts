import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import NextAuth, { getServerSession } from 'next-auth/next';

import { env } from '@/infra/env';

import { jwt } from './jwt/jwt';
import { Credentials } from './providers/credentials';
import { session } from './session/session';

function LoginBuild() {
  const authOptions: NextAuthOptions = {
    secret: env.AUTH_SECRET,
    pages: {
      signIn: '',
    },
    callbacks: {
      jwt,
      session,
    },
    session: {
      strategy: 'jwt',
      maxAge: 30 * 60, // 30 minutes
    },
    providers: [Credentials],
  };

  const handler = NextAuth(authOptions);

  function auth(
    ...args:
      | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
      | [NextApiRequest, NextApiResponse]
      | []
  ) {
    return getServerSession(...args, authOptions);
  }

  return {
    auth,
    handler,
  };
}

export const Login = LoginBuild();
