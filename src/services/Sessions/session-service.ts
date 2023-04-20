import { AxiosInstance } from "axios";
import { CreateSession, Session } from "../../interfaces/session-interface";
import { API_INSTANCE } from "../api-service";

export class SessionService {
  private API: AxiosInstance;
  public constructor() {
    this.API = API_INSTANCE;
  }

  async getSessions(user: string, page: number) {
    try {
      return await this.API.get<{
        count: number;
        sessions: Session[];
      }>(`sessions/${user}`, {
        params: {
          page: page - 1,
        },
      });
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }

  async createSessions(createSession: CreateSession) {
    try {
      return await this.API.post<Session>(`sessions`, createSession);
    } catch (error: any) {
      if (!error.response) return error.response;
      return error.message;
    }
  }

  async removeSessions(removeSession: Session) {
    try {
      return await this.API.delete<Session>(`sessions/${removeSession._id}`);
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }
}
