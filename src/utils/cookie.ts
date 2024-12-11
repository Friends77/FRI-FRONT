import Cookies, {
  Cookie,
  CookieGetOptions,
  CookieSetOptions,
} from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: Cookie,
  options?: CookieSetOptions
) => {
  cookies.set(name, value, { ...options });
};

export const getCookie = (name: string, options?: CookieGetOptions) => {
  return cookies.get(name, { ...options });
};

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  cookies.remove(name, { ...options });
};
