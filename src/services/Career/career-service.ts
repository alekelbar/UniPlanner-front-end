//localhost:3000/api/v1/careers/all

import { AxiosInstance } from "axios";
import { Career } from "../../interfaces/career.interface";
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
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }

  async getCareers(id: string) {
    try {
      return await this.API.get<Career[]>(`careers/${id}`);
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }

  async addCareer(careerId: string, userId: string) {
    try {
      return await this.API.post<Career>(`careers/${careerId}/${userId}`);
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }

  async removeCareer(idUser: string, idCareer: string) {
    try {
      return await this.API.delete<Career>(`careers/${idCareer}/${idUser}`);
    } catch (error: any) {
      if (error.response) return error.response;
      else return error.message;
    }
  }
}
