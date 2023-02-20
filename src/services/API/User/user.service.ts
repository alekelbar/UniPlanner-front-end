import axios, { AxiosInstance } from "axios";
import { UserCredentials, UserLogin, UserRegister } from "./users.models";
import { ApiVersion } from "../api-version";

export enum USER_EXCEPTIONS {
  ALREADY_REGISTERED = "Usted ya se encuentra registrado",
  INTERNAL_ERROR = "Tenemos un error de servidor...",
  INVALID_CREDENTIALS = "Sus credenciales son invalidas",
}

export class UserService {
  private baseUrl: string = `http://localhost:3000/api/`;
  private API: AxiosInstance;
  private static instance: UserService | null = null;

  private constructor(serviceVersion: ApiVersion) {
    this.API = axios.create({
      baseURL: this.baseUrl + `${serviceVersion}/`,
    });
  }

  public static createService(version: ApiVersion): UserService {
    if (!this.instance) {
      this.instance = new UserService(version);
      return this.instance;
    }
    return this.instance;
  }

  async login(userLogin: UserLogin): Promise<UserCredentials> {
    try {
      const response = await this.API.post<UserCredentials>(
        "auth/login",
        userLogin
      );

      const data = response.data;

      return {
        ...data,
        error: null,
      };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        return {
          token: null,
          user: null,
          error: USER_EXCEPTIONS.INVALID_CREDENTIALS,
        };
      }
      return {
        token: null,
        user: null,
        error: USER_EXCEPTIONS.INTERNAL_ERROR,
      };
    }
  }

  async register(userRegister: UserRegister): Promise<UserCredentials> {
    try {
      const response = await this.API.post<UserCredentials>(
        "auth/register",
        userRegister
      );
      const data = response.data;

      return {
        ...data,
        error: null,
      };
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return {
          token: null,
          user: null,
          error: USER_EXCEPTIONS.ALREADY_REGISTERED,
        };
      }
      return {
        token: null,
        user: null,
        error: USER_EXCEPTIONS.INTERNAL_ERROR,
      };
    }
  }
}
