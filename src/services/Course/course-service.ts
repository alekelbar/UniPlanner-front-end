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
      return await this.API.delete<Course>(`courses/${course._id}`);
    } catch (error: any) {
      if (error.response) return error.response;
      else error.message;
    }
  }

  public async createCourse(course: Course) {
    try {
      return await this.API.post<Course>(`courses`, course);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else return error.message;
    }
  }

  public async updateCourse(course: Course, courseId: string) {
    try {
      return await this.API.patch<Course>(`courses/${courseId}`, course);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else return error.message;
    }
  }
}
