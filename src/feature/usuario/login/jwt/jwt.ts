import { JWTAccount, JWTParams, JWTUser } from './types';

export const jwt = async ({ token, account: jwtAcount, user: jwtUser }: JWTParams) => {
  const account = jwtAcount as JWTAccount;
  const user = jwtUser as JWTUser;

  const dinewiseToken = account?.dinewise?.accessToken;
  const userToken = user?.accessToken ?? user?.accessToken;
  const accountToken = account?.access_token;

  if (!token.accessToken) {
    token.accessToken = dinewiseToken ?? userToken ?? accountToken;
  }

  return token;
};
