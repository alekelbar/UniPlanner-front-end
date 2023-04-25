import { AxiosInstance } from "axios";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { CreateTask, Task } from "../../interfaces/task-interface";
import { API_INSTANCE } from "../api-service";

export class TaskService {
  private API: AxiosInstance;
  private static instance: TaskService | null = null;

  public constructor() {
    this.API = API_INSTANCE;
  }

  async getTasks(delivery: string, page: number) {
    try {
      return await this.API.get<{
        count: number;
        tasks: Task[];
      }>(`tasks/delivery/${delivery}`, {
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

  async createTask(createTask: CreateTask) {
    try {
      return await this.API.post<Task>(`tasks`, createTask);
    } catch (error: any) {
      if (!error.response) {
        return error.response;
      } else return error.message;
    }
  }

  async removeTask(removeTask: Task) {
    try {
      return await this.API.delete<Task>(`tasks/${removeTask._id}`);
    } catch (error: any) {
      if (!error.response) return error.response;
      else return error.message;
    }
  }

  async updateTask(updateTask: Task) {
    try {
      return await this.API.patch<Task>(`tasks/${updateTask._id}`, updateTask);
    } catch (error: any) {
      if (error.response) {
        return error.response;
      } else return error.message;
    }
  }
}
