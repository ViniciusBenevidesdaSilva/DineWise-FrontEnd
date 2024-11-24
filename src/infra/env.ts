export const env = {
  get API_URL(): string {
    return process.env.NEXT_PUBLIC_API_URL as string;
  },
  get HOST(): string {
    return process.env.NEXT_PUBLIC_HOST as string;
  },
  get AUTH_SECRET(): string {
    return process.env.NEXTAUTH_SECRET as string;
  },
  get ENABLE_ROBOTS(): boolean {
    return process.env.NEXT_PUBLIC_ENABLE_ROBOTS === 'true';
  },
};
