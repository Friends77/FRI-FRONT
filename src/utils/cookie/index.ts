import {
  Cookie,
  CookieGetOptions,
  CookieSetOptions,
} from 'node_modules/universal-cookie/cjs/types';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: Cookie,
  options?: CookieSetOptions,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string, options?: CookieGetOptions) => {
  return cookies.get(name, { ...options });
};

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  return cookies.remove(name, { ...options });
};
