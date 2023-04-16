import { AxiosInstance } from "axios";
import { Course, PaginatedCourses } from "../../interfaces/course.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { API_INSTANCE } from "../api-service";

export class CourseService {
  private API: AxiosInstance;
  private static instance: CourseService | null = null;

  public constructor() {
    this.API = API_INSTANCE;
  }

  public async getUserCourse(userId: string, careerId: string, page: number) {
    try {
      const courses = await this.API.get<PaginatedCourses>(
        `courses/user/${userId}/career/${careerId}`,
        {
          params: {
            page: page - 1, // Ajust por metodo de paginación del backend
          },
        }
      );

      return courses;
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

  public async removeCourse(course: Course) {
    try {
      const response = await this.API.delete<Course>(`courses/${course._id}`);
      return response;
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
        case 404:
          return RESPONSES.NOT_FOUND;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  public async createCourse(course: Course) {
    try {
      const response = await this.API.post<Course>(`courses`, course);

      console.log("El curso que recibimos: ", course);
      
      return response;
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
        case 404:
          return RESPONSES.NOT_FOUND;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }

  public async updateCourse(id: string, course: Course) {
    try {
      const response = await this.API.patch<Course>(`courses/${id}`, course);

      return response;
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
        case 404:
          return RESPONSES.NOT_FOUND;
        default:
          return RESPONSES.INTERNAL_SERVER_ERROR;
      }
    }
  }
}
