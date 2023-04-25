import { AxiosInstance } from "axios";
import { RESPONSES } from "../../interfaces/response-messages";
import {
  UserLogin,
  UserRegister,
  UserState,
} from "../../interfaces/users.interface";
import { UpdateUser, User } from "../../types";
import { API_INSTANCE } from "../api-service";

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
  private API: AxiosInstance;

  public constructor() {
    this.API = API_INSTANCE;
  }

  async login(userLogin: UserLogin) {
    try {
      return await this.API.post<UserState>("auth/login", userLogin);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async register(userRegister: UserRegister) {
    try {
      return await this.API.post<UserState>("auth/register", userRegister);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async updateUser(updateUser: UpdateUser, id: string) {
    try {
      return await this.API.patch<User>(`auth/user/${id}`, updateUser);
    } catch (error: any) {
      return error.response.data.message;
    }
  }
}
