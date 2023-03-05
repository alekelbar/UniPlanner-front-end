import axios, { AxiosInstance } from "axios";
import Career from "../../../pages/home/careers";
import { authInterceptor } from "../../interceptors/auth.interceptor";
import { RESPONSES } from "../../interfaces/response-messages";
import {
  UserLogin,
  UserRegister,
  UserState,
} from "../../interfaces/users.interface";
import type { User, UpdateUser } from "../../types";

export enum USER_EXCEPTIONS {
  ALREADY_REGISTERED = "Usted ya se encuentra registrado",
  INTERNAL_ERROR = "Tenemos un error de servidor...",
  INVALID_CREDENTIALS = "Sus credenciales son invalidas",
  INVALID_SESSION = "Su sesión expiro",
  BAD_REQUEST = "¿Esta seguro de enviar la información adecuada?",
  NOT_FOUND = "No se ha encontrado el recurso",
  ALREADY_EXIST = "Ya se encuentra registrado un usuario con ese documento",
}

export class UserService {
  private baseUrl: string = `http://localhost:3000/api`;
  private API: AxiosInstance;
  private static instance: UserService | null = null;

  private constructor(serviceVersion: string) {
    this.API = axios.create({
      baseURL: this.baseUrl + `/${serviceVersion}/`,
    });
    authInterceptor(this.API);
  }

  public static createService(version: string): UserService {
    if (!this.instance) {
      this.instance = new UserService(version);
      return this.instance;
    }
    return this.instance;
  }

  async login(userLogin: UserLogin) {
    try {
      const { data } = await this.API.post<UserState>("auth/login", userLogin);

      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }
      switch (error.response.status) {
        case 401:
          return RESPONSES.UNAUTHORIZE;
        case 400:
          return RESPONSES.INTERNAL_SERVER_ERROR;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  async register(userRegister: UserRegister) {
    try {
      const { data } = await this.API.post<UserState>(
        "auth/register",
        userRegister
      );
      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }
      switch (error.response.status) {
        case 401:
          return RESPONSES.UNAUTHORIZE;
        case 400:
          return RESPONSES.INTERNAL_SERVER_ERROR;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  async updateUser(updateUser: UpdateUser, id: string) {
    try {
      const { data } = await this.API.patch<User>(
        `auth/user/${id}`,
        updateUser
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }
      switch (error.response.status) {
        case 401:
          return RESPONSES.UNAUTHORIZE;
        case 400:
          return RESPONSES.INTERNAL_SERVER_ERROR;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }
}
