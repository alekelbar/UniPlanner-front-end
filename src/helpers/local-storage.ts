import Cookies from "js-cookie";
import { UserState } from "../interfaces/users.interface";

export const setLocalToken = (session: UserState) => {
  const auth = JSON.stringify(session);
  Cookies.set("token", auth);
};

export const getLocalToken = () => {
  const token = Cookies.get("token");
  if (token) {
    return JSON.parse(token);
  }
  return null;
};

export const logOut = () => {
  setLocalToken({ error: null, token: null, user: null });
};
