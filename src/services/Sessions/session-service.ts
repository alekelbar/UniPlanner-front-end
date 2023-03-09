import axios, { AxiosInstance } from "axios";
import { authInterceptor } from "../../interceptors";
import { RESPONSES } from "../../interfaces/response-messages";
import { Session } from "../../interfaces/session-interface";
import { UserToken } from "../../interfaces/users.interface";
import { CreateSession } from "../../interfaces/session-interface";
import { API_URL } from "../api-service";

export class SessionService {
  private API: AxiosInstance;
  private static instance: SessionService | null = null;

  private constructor() {
    this.API = axios.create({
      baseURL: API_URL,
    });
    authInterceptor(this.API);
  }

  public static createService(): SessionService {
    if (!this.instance) {
      this.instance = new SessionService();
      return this.instance;
    }
    return this.instance;
  }

  async getSessions(user: UserToken, page: number) {
    try {
      const sessions = await this.API.get<{
        count: number;
        sessions: Session[];
      }>(`sessions/${user.id}`, {
        params: {
          page: page - 1,
        },
      });

      return sessions;
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

  async createSessions(createSession: CreateSession) {
    try {
      const session = await this.API.post<Session>(
        `sessions`,
        createSession
      );

      return session;
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

  async removeSessions(removeSession: Session) {
    try {
      const session = await this.API.delete<Session>(
        `sessions/${removeSession._id}`
      );

      return session;
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
