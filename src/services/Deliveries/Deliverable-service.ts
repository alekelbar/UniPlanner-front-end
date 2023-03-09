import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors";
import { Course } from "../../interfaces/course.interface";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { API_URL } from "../api-service";

export class DeliverableService {
  private API: AxiosInstance;
  private static instance: DeliverableService | null = null;

  private constructor() {
    this.API = axios.create({
      baseURL: API_URL,
    });
    authInterceptor(this.API);
  }

  public static createService(): DeliverableService {
    if (!this.instance) {
      this.instance = new DeliverableService();
      return this.instance;
    }
    return this.instance;
  }

  async getDeliverables(course: Course, page: number) {
    try {
      const deliverables = await this.API.get<{
        count: number;
        deliverables: Deliverable[];
      }>(`deliverables/course/${course._id}`, {
        params: {
          page: page - 1,
        },
      });

      return deliverables;
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

  async createDeliverables(deriverable: Deliverable) {
    try {
      const deliverable = await this.API.post<Deliverable>(
        `deliverables`,
        deriverable
      );

      return deliverable;
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

  async removeDeliverables(deriverable: Deliverable) {
    try {
      const deliverable = await this.API.delete<Deliverable>(
        `deliverables/${deriverable._id}`
      );

      return deliverable;
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

  public async updateDeliverable(deriverable: Deliverable) {
    try {
      const updated = await this.API.patch<Deliverable>(
        `deliverables/${deriverable._id}`,
        deriverable
      );

      return updated;
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
}
