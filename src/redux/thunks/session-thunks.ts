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
import { AppDispatch, RootState } from "../store";

export const startLoadSession = (page: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingSession());

    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = new SessionService();
    const response = await service.getSessions(user, page);

    if (typeof response === "string") {
      dispatch(stopLoadingSession());
      return response;
    }

    const data = response.data;
    dispatch(loadSessions(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};

export const startcreateSession = (createSession: CreateSession) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingSession());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    createSession.user = user.id;

    const service = new SessionService();
    const response = await service.createSessions(createSession);

    if (typeof response === "string") {
      dispatch(stopLoadingSession());
      return response;
    }

    const session = response.data;
    dispatch(addSession(session));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveSession = (delSession: Session) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingSession());

    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }
    const service = new SessionService();
    const response = await service.removeSessions(delSession);

    if (typeof response === "string") {
      dispatch(stopLoadingSession());
      return response;
    }

    const deliverie = response.data;
    dispatch(removeSession(deliverie));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};
