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
      const sessions = await this.API.get<{
        count: number;
        sessions: Session[];
      }>(`sessions/${user}`, {
        params: {
          page: page - 1,
        },
      });

      return sessions;
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }

  async createSessions(createSession: CreateSession) {
    try {
      const session = await this.API.post<Session>(`sessions`, createSession);

      return session;
    } catch (error: any) {
      if (!error.response) return error.response;
      return error.message;
    }
  }

  async removeSessions(removeSession: Session) {
    try {
      const session = await this.API.delete<Session>(
        `sessions/${removeSession._id}`
      );
      return session;
    } catch (error: any) {
      if (error.response) return error.response;
      return error.message;
    }
  }
}
