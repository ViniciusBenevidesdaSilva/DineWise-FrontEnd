export const getCookie = (cookies: string, key: string): string | undefined => {
  const cookiesArray = cookies.split(';').map((cookie) => cookie.trim());

  const keyValue = cookiesArray.find((cookie) => cookie.startsWith(`${key}=`));
  const value = keyValue ? keyValue.split(`${key}=`)[1] : undefined;

  return value;
};
