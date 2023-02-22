import axios, { AxiosInstance } from "axios";
import { UserCredentials, UserLogin, UserRegister } from "./users.models";
import { ApiVersion } from "../api-version";
import { Career } from "../Career/career.models";
import { authInterceptor } from "../../../interceptors/auth.interceptor";

export enum USER_EXCEPTIONS {
  ALREADY_REGISTERED = "Usted ya se encuentra registrado",
  INTERNAL_ERROR = "Tenemos un error de servidor...",
  INVALID_CREDENTIALS = "Sus credenciales son invalidas",
  USER_NOT_REGISTERED = "El usuario no se encuentra registrado",
}

export class UserService {
  private baseUrl: string = `http://localhost:3000/api`;
  private API: AxiosInstance;
  private static instance: UserService | null = null;

  private constructor(serviceVersion: ApiVersion) {
    this.API = axios.create({
      baseURL: this.baseUrl + `/${serviceVersion}/`,
    });
    authInterceptor(this.API);
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
      const { data } = await this.API.post<UserCredentials>(
        "auth/login",
        userLogin
      );

      return {
        ...data,
        error: null,
      };
    } catch (error: any) {
      const response = {
        token: null,
        user: null,
        error: USER_EXCEPTIONS.INTERNAL_ERROR,
      };

      if (error.response) {
        switch (error.response.status) {
          case 401:
            return {
              ...response,
              error: USER_EXCEPTIONS.INVALID_CREDENTIALS,
            };
          case 400:
            return {
              ...response,
              error: USER_EXCEPTIONS.USER_NOT_REGISTERED,
            };
        }
      }
      return response;
    }
  }

  async register(userRegister: UserRegister): Promise<UserCredentials> {
    console.log(userRegister);
    try {
      const { data } = await this.API.post<UserCredentials>(
        "auth/register",
        userRegister
      );
      return {
        ...data,
        error: null,
      };
    } catch (error: any) {
      const response = {
        token: null,
        user: null,
        error: USER_EXCEPTIONS.INTERNAL_ERROR,
      };

      if (!error.response) {
        return response;
      }

      switch (error.response.status) {
        case 400:
          return {
            ...response,
            error: USER_EXCEPTIONS.ALREADY_REGISTERED,
          };
        default:
          return response;
      }
    }
  }

  async getCareers(identification: string) {
    // careers/:id
    const { data } = await this.API.get<Career[]>(
      `auth/careers/${identification}`
    );
    return data;
  }
}
