import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors";
import { Course } from "../../interfaces/course.interface";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { ApiVersion } from "../../types";

export class DeliverableService {
  private baseUrl: string = `http://localhost:3000/api/`;
  private API: AxiosInstance;
  private static instance: DeliverableService | null = null;

  private constructor(serviceVersion: ApiVersion) {
    this.API = axios.create({
      baseURL: this.baseUrl + `${serviceVersion}/`,
    });
    authInterceptor(this.API);
  }

  public static createService(version: ApiVersion): DeliverableService {
    if (!this.instance) {
      this.instance = new DeliverableService(version);
      return this.instance;
    }
    return this.instance;
  }

  async getDeliverables(course: Course, page: number) {
    try {
      const deliverables = await this.API.get<Deliverable[]>(
        `deliverables/course/${course._id}`,
        {
          params: {
            page: page - 1,
          },
        }
      );

      return deliverables;
    } catch (error: any) {
      console.log(error);
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

  async createDeliverables(deriverable: Deliverable) {
    try {
      const deliverable = await this.API.post<Deliverable>(
        `deliverables`,
        deriverable
      );

      return deliverable;
    } catch (error: any) {
      console.log(error);
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
}
