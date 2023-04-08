import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux";

export const addToken = (request: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.token
    ? `Bearer ${store.getState().auth.token}`
    : null;
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
};

export const authInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use((request) => addToken(request));
};
