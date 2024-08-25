import Cookies from "js-cookie";
import { CookieAttributes } from "node_modules/@types/js-cookie";

export const setCookie = (
  key: string,
  value: string,
  options: CookieAttributes = {}
) => {
  return Cookies.set(key, value, {
    expires: 1,
    ...options,
  });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};
