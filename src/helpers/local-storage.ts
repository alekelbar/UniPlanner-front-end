import Cookies from "js-cookie";
import { UserState } from "../interfaces/users.interface";
export enum StorageKeys {
  token = "token",
  career = "careers",
  courses = "courses",
}

export const setLocalToken = (session: UserState, key: string) => {
  const auth = JSON.stringify(session);
  Cookies.set(key, auth);
};

export const getLocalToken = () => {
  const token = Cookies.get("token");
  if (token) {
    return JSON.parse(token);
  }
  return null;
};

export const logOut = () => {
  Cookies.remove("token");
};
