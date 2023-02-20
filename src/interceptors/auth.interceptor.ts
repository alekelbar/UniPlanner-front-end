import { InternalAxiosRequestConfig } from "axios";
import { store } from "../redux";
import axios from "axios";

export const authInterceptor = () => {
  const addToken = (request: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token
      ? `Bearer ${store.getState().auth.token}`
      : null;
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  };

  axios.interceptors.request.use((request) => addToken(request));
};
