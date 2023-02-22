import axios, { AxiosInstance } from "axios";
import { ApiVersion } from "../../types/api-version";
import {
  UserLogin,
  UserState,
  UserRegister,
} from "../../interfaces/users.interface";
import { authInterceptor } from "../../interceptors/auth.interceptor";
import Career from '../../../pages/home/index';

export enum USER_EXCEPTIONS {
  ALREADY_REGISTERED = "Usted ya se encuentra registrado",
  INTERNAL_ERROR = "Tenemos un error de servidor...",
  INVALID_CREDENTIALS = "Sus credenciales son invalidas",
  INVALID_SESSION = "Su sesión expiro",
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

  async login(userLogin: UserLogin): Promise<UserState> {
    try {
      const { data } = await this.API.post<UserState>(
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
        careers: [],
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

  async register(userRegister: UserRegister): Promise<UserState> {
    try {
      const { data } = await this.API.post<UserState>(
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
        careers: [],
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
    try {
      const { data } = await this.API.get<Career[]>(
        `auth/careers/${identification}`
      );
      return data;
    } catch (error: any) {
      if (!error.response) {
        return USER_EXCEPTIONS.INTERNAL_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return USER_EXCEPTIONS.USER_NOT_REGISTERED;
        case 401:
          return USER_EXCEPTIONS.INVALID_SESSION;
        default:
          return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
    }
  }

  async addCareer(idUser: string, idCareer: string) {
    const { data } = await this.API.get<Career[]>(
      `auth/careers/${idCareer}/${idUser}`
    );
    return data;
  }
}
