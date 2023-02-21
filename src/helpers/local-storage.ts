import { UserCredentials } from "../services/API/User/users.models";
import Cookies from "js-cookie";

export const setLocalToken = (session: UserCredentials) => {
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
