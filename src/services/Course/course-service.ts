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
      return await this.API.get<PaginatedCourses>(
        `courses/user/${userId}/career/${careerId}`,
        {
          params: {
            page: page - 1, // Ajust por metodo de paginación del backend
          },
        }
      );
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  public async removeCourse(course: Course) {
    try {
      return await this.API.delete<Course>(`courses/${course._id}`);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  public async createCourse(course: Course) {
    try {
      return await this.API.post<Course>(`courses`, course);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  public async updateCourse(course: Course, courseId: string) {
    try {
      return await this.API.patch<Course>(`courses/${courseId}`, course);
    } catch (error: any) {
      return error.response.data.message;
    }
  }
}
