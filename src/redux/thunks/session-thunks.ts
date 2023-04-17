import { RESPONSES } from "../../interfaces/response-messages";
import { CreateSession, Session } from "../../interfaces/session-interface";
import { SessionService } from "../../services/Sessions/session-service";
import {
  addSession,
  loadSessions,
  removeSession,
  startLoadingSession,
  stopLoadingSession,
} from "../slices";
import { AppDispatch } from "../store";

export const startLoadSession = (userId: string, page: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingSession());

    const response = await new SessionService().getSessions(userId, page);

    const { data } = response;
    if (!data) {
      dispatch(stopLoadingSession());
      return response;
    }

    dispatch(loadSessions(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};

export const startcreateSession = (
  user: string,
  createSession: CreateSession
) => {
  return async (dispatch: AppDispatch) => {
    const response = await new SessionService().createSessions({
      ...createSession,
      user,
    });

    const { data } = response;
    if (data) {
      console.log(data);
      dispatch(addSession(data));
      return RESPONSES.SUCCESS;
    }
    return response;
  };
};

export const startRemoveSession = (delSession: Session) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingSession());
    const response = await new SessionService().removeSessions(delSession);

    const { data } = response;
    if (!data) {
      return response;
    }
    dispatch(removeSession(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};
