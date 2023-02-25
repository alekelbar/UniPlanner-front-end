import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors/auth.interceptor";
import { PaginatedCourses, Course } from "../../interfaces/course.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { ApiVersion } from "../../types/api-version";

export class CourseService {
  private baseUrl: string = `http://localhost:3000/api`;
  private API: AxiosInstance;
  private static instance: CourseService | null = null;

  private constructor(serviceVersion: ApiVersion) {
    this.API = axios.create({
      baseURL: this.baseUrl + `/${serviceVersion}/`,
    });
    authInterceptor(this.API);
  }

  public static createService(version: ApiVersion): CourseService {
    if (!this.instance) {
      this.instance = new CourseService(version);
      return this.instance;
    }
    return this.instance;
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