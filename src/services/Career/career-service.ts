//localhost:3000/api/v1/careers/all

import { AxiosInstance } from "axios";
import { Career } from "../../interfaces/career.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { API_INSTANCE } from "../api-service";

export class CareerService {
  private API: AxiosInstance;
  private static instance: CareerService | null = null;

  public constructor() {
    this.API = API_INSTANCE;
  }

  public async listAll() {
    try {
      return await this.API.get<Career[]>("careers/find/all");
    } catch (error) {
      console.log(error);
      return RESPONSES.INTERNAL_SERVER_ERROR;
    }
  }

  async getCareers(identification: string) {
    try {
      const { data } = await this.API.get<Career[]>(
        `careers/${identification}`
      );
      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return RESPONSES.BAD_REQUEST;
        case 401:
          return RESPONSES.UNAUTHORIZE;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  async addCareer(idUser: string, idCareer: string) {
    try {
      const { data } = await this.API.post<Career>(
        `careers/${idCareer}/${idUser}`
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return RESPONSES.BAD_REQUEST;
        case 401:
          return RESPONSES.UNAUTHORIZE;
        case 404:
          return RESPONSES.NOT_FOUND;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  async removeCareer(idUser: string, idCareer: string) {
    try {
      const { data } = await this.API.delete<Career>(
        `careers/${idCareer}/${idUser}`
      );

      return data;
    } catch (error: any) {
      if (!error.response) {
        return RESPONSES.INTERNAL_SERVER_ERROR;
      }

      switch (error.response.status) {
        case 400:
          return RESPONSES.BAD_REQUEST;
        case 401:
          return RESPONSES.UNAUTHORIZE;
        case 404:
          return RESPONSES.NOT_FOUND;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }
}
