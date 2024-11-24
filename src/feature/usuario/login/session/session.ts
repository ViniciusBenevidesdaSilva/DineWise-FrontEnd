import jwt from 'jsonwebtoken';

import { ExtendedSession, ExtendedUser, SessionParams } from './types';

export const session = async ({ session: jwtSession, token }: SessionParams) => {
  const session = jwtSession as ExtendedSession;
  const accessToken = token.accessToken as string;

  if (accessToken) {
    const decodedToken = jwt.decode(accessToken) as { [key: string]: unknown };
    const baseTokenUrl2005 = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/';
    const baseTokenUrl2008 = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/';

    session.user = {
      ...session.user,
      name: decodedToken[`${baseTokenUrl2005}name`],
      email: decodedToken[`${baseTokenUrl2005}emailaddress`],
      role: decodedToken[`${baseTokenUrl2008}role`],
      id: decodedToken[`${baseTokenUrl2005}nameidentifier`],
      isAdmin: decodedToken[`${baseTokenUrl2008}role`] === 'Admin',
    } as ExtendedUser;
  }

  session.accessToken = accessToken;

  return { ...session, token: accessToken };
};
