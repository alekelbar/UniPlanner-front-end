import { AxiosInstance } from "axios";
import { Course } from "../../interfaces/course.interface";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { API_INSTANCE } from "../api-service";

export class DeliverableService {
  private API: AxiosInstance;
  private static instance: DeliverableService | null = null;

  public constructor() {
    this.API = API_INSTANCE;
  }

  async getDeliverables(course: string, page: number) {
    try {
      return await this.API.get<{
        count: number;
        deliverables: Deliverable[];
      }>(`deliverables/course/${course}`, {
        params: {
          page: page - 1,
        },
      });
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else return error.message;
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
