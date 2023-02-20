//localhost:3000/api/v1/careers/all

import { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { ApiVersion } from "../api-version";
import { authInterceptor } from "../../../interceptors/auth.interceptor";
import { CareerState, Career } from "./career.models";

export class CareerService {
  private baseUrl: string = `localhost:3000/api/`;
  private API: AxiosInstance;
  private static instance: CareerService | null = null;

  private constructor(serviceVersion: ApiVersion) {
    this.API = axios.create({
      baseURL: this.baseUrl + `${serviceVersion}/`,
    });
  }

  public static createService(version: ApiVersion): CareerService {
    if (!this.instance) {
      this.instance = new CareerService(version);
      return this.instance;
    }
    return this.instance;
  }

  public async listAll() {
    return await axios.get<Career[]>(
      "http://localhost:3000/api/v1/careers/all"
    );
  }
}

// export class UserService {
//   private baseUrl: string = `http://localhost:3000/api/`;
//   private API: AxiosInstance;
//   private static instance: UserService | null = null;

//   private constructor(serviceVersion: ApiVersion) {
//     this.API = axios.create({
//       baseURL: this.baseUrl + `${serviceVersion}/`,
//     });
//   }

//   public static createService(version: ApiVersion): UserService {
//     if (!this.instance) {
//       this.instance = new UserService(version);
//       return this.instance;
//     }
//     return this.instance;
//   }
// }
