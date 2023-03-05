import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { CreateTask, Task } from "../../interfaces/task-interface";

export class TaskService {
  private baseUrl: string = `http://localhost:3000/api/`;
  private API: AxiosInstance;
  private static instance: TaskService | null = null;

  private constructor(serviceVersion: string) {
    this.API = axios.create({
      baseURL: this.baseUrl + `${serviceVersion}/`,
    });
    authInterceptor(this.API);
  }

  public static createService(version: string): TaskService {
    if (!this.instance) {
      this.instance = new TaskService(version);
      return this.instance;
    }
    return this.instance;
  }

  async getTasks(delivery: Deliverable, page: number) {
    try {
      const tasks = await this.API.get<{
        count: number;
        tasks: Task[];
      }>(`tasks/delivery/${delivery._id}`, {
        params: {
          page: page - 1,
        },
      });

      return tasks;
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

  async createTask(createTask: CreateTask) {
    try {
      const task = await this.API.post<Task>(`tasks`, createTask);

      return task;
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

  async removeTask(removeTask: Task) {
    try {
      const task = await this.API.delete<Task>(`tasks/${removeTask._id}`);
      return task;
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

  async updateTask(updateTask: Task) {
    try {
      const task = await this.API.patch<Task>(
        `tasks/${updateTask._id}`,
        updateTask
      );
      return task;
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
