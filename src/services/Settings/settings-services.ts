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
      const settings = await this.API.get<Setting>(`user-settings/${user}`);
      return settings.data;
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

  async createSessions(createSetting: CreateSetting) {
    try {
      const settings = await this.API.post<Setting>(
        `user-settings`,
        createSetting
      );

      return settings.data;
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

  async updateSetting(updateSetting: Setting) {
    try {
      const setting = await this.API.patch<Setting>(
        `user-settings/${updateSetting._id}`,
        updateSetting
      );

      return setting.data;
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
