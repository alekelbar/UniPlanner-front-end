import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors";
import { RESPONSES } from "../../interfaces/response-messages";
import { Session } from "../../interfaces/session-interface";
import { UserToken } from "../../interfaces/users.interface";
import { CreateSession } from "../../interfaces/session-interface";
import { API_URL } from "../api-service";
import { CreateSetting, Setting } from "../../interfaces/settings-interfaces";
import { Settings } from "@mui/icons-material";

export class SettingService {
  private API: AxiosInstance;
  private static instance: SettingService | null = null;

  private constructor() {
    this.API = axios.create({
      baseURL: API_URL,
    });
    authInterceptor(this.API);
  }

  public static createService(): SettingService {
    if (!this.instance) {
      this.instance = new SettingService();
      return this.instance;
    }
    return this.instance;
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

      console.log(setting);

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
