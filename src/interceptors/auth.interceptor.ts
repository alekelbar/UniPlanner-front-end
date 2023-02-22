import { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { store } from "../redux";

export const authInterceptor = (axios: AxiosInstance) => {
  const addToken = (request: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token
      ? `Bearer ${store.getState().auth.token}`
      : null;
    if (token) {
      request.headers.Authorization = token;
    }

    console.log(token);
    return request;
  };

  axios.interceptors.request.use((request) => addToken(request));
};
