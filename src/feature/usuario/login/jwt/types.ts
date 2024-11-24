import { Account, Profile, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export type JWTParams = {
  token: JWT;
  user: User | AdapterUser;
  account?: Account | null;
  profile?: Profile;
  session?: Session | null;
  trigger?: 'signIn' | 'signUp' | 'update';
  isNewUser?: boolean;
};

export interface JWTAccount extends Account {
  dinewise: {
    userId: number;
    email: string;
    isAdmin: boolean;
    accessToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

export interface JWTUser extends User {
  accessToken?: string;
}
