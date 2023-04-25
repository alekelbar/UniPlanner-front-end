import { AxiosInstance } from "axios";
import { RESPONSES } from "../../interfaces/response-messages";
import { CreateSetting, Setting } from "../../interfaces/settings-interfaces";
import { API_INSTANCE } from "../api-service";

export class SettingService {
  private API: AxiosInstance;

  public constructor() {
    this.API = API_INSTANCE;
  }

  async getSetting(user: string) {
    try {
      return await this.API.get<Setting>(`user-settings/${user}`);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async createSetting(createSetting: CreateSetting) {
    try {
      return await this.API.post<Setting>(`user-settings`, createSetting);
    } catch (error: any) {
      return error.response.data.message;
    }
  }

  async updateSetting(updateSetting: Setting) {
    try {
      return await this.API.patch<Setting>(
        `user-settings/${updateSetting._id}`,
        updateSetting
      );
    } catch (error: any) {
      return error.response.data.message;
    }
  }
}
