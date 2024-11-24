import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export type SessionParams = {
  session: Session;
  token: JWT;
  user: User;
};

export interface ExtendedUser {
  isAdmin: boolean;
}

export interface ExtendedSession extends Session {
  accessToken: string;
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isAdmin?: boolean | null;
  };
}
