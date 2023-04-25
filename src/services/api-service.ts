import axios, { InternalAxiosRequestConfig } from "axios";
import { getLocalToken } from "../helpers/local-storage";

type AvailableVersions = "v1" | "v2";

export const API_VERSION: AvailableVersions = "v2";

// export const API_URL = `https://ge-back.onrender.com/api/${API_VERSION}/`
export const API_URL = process.env.API_URL;

const addToken = (request: InternalAxiosRequestConfig) => {
  const token = getLocalToken()?.token
    ? `Bearer ${getLocalToken()?.token}`
    : null;
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
};

// export const API_URL = `http://localhost:3000/api/${API_VERSION}/`;

const API_INSTANCE = axios.create({
  baseURL: API_URL,
});

API_INSTANCE.interceptors.request.use((request) => addToken(request));

export { API_INSTANCE };
