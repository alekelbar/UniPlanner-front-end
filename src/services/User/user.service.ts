import axios, { AxiosInstance } from "axios";
import Career from "../../../pages/home/career";
import { authInterceptor } from "../../interceptors/auth.interceptor";
import {
  UserLogin, UserRegister, UserState
} from "../../interfaces/users.interface";
import { UpdateUser, User } from "../../models";
import { ApiVersion } from "../../types/api-version";

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
      const { data } = await this.API.post<UserState>("auth/login", userLogin);

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
              error: USER_EXCEPTIONS.INVALID_CREDENTIALS,
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
          return USER_EXCEPTIONS.BAD_REQUEST;
        case 401:
          return USER_EXCEPTIONS.INVALID_SESSION;
        default:
          return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
    }
  }

  async addCareer(idUser: string, idCareer: string) {
    try {
      const { data } = await this.API.post<Career>(
        `auth/careers/${idCareer}/${idUser}`
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return USER_EXCEPTIONS.INTERNAL_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return USER_EXCEPTIONS.BAD_REQUEST;
        case 401:
          return USER_EXCEPTIONS.INVALID_SESSION;
        case 404:
          return USER_EXCEPTIONS.NOT_FOUND;
        default:
          return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
    }
  }

  async removeCareer(idUser: string, idCareer: string) {
    try {
      const { data } = await this.API.delete<Career>(
        `auth/careers/${idCareer}/${idUser}`
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return USER_EXCEPTIONS.INTERNAL_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return USER_EXCEPTIONS.BAD_REQUEST;
        case 401:
          return USER_EXCEPTIONS.INVALID_SESSION;
        case 404:
          return USER_EXCEPTIONS.NOT_FOUND;
        default:
          return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
    }
  }

  async updateUser(updateUser: UpdateUser, id: string) {
    console.log(updateUser);

    try {
      const { data } = await this.API.patch<User>(
        `auth/user/${id}`,
        updateUser
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
      
      console.log(error.response);
      switch (error.response.status) {
        case 400:
          return USER_EXCEPTIONS.ALREADY_EXIST;
        case 401:
          return USER_EXCEPTIONS.INVALID_SESSION;
        default:
          return USER_EXCEPTIONS.INTERNAL_ERROR;
      }
    }
  }
}
