import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, SessionState } from "../../../interfaces/session-interface";

const initialState: SessionState = {
  count: 0,
  loading: false,
  selected: { _id: "", duration: 0, name: "unknown", type: "RESTING" },
  sessions: [],
};

export const SessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {
    loadSessions: (
      state,
      {
        payload,
      }: PayloadAction<{
        count: number;
        sessions: Session[];
      }>
    ) => {
      state.sessions = payload.sessions;
      state.count = payload.count;
    },
    startLoadingSession: (state) => {
      state.loading = true;
    },
    stopLoadingSession: (state) => {
      state.loading = false;
    },
    addSession: (state, { payload }: PayloadAction<Session>) => {
      state.sessions.push(payload);
    },
    removeSession: (state, { payload }: PayloadAction<Session>) => {
      state.sessions = state.sessions.filter(
        (session) => session._id !== payload._id
      );
      state.count -= 1;
    },
    setSelectedSession: (state, { payload }: PayloadAction<Session>) => {
      state.selected = payload;
    },
  },
});

export const {
  addSession,
  loadSessions,
  removeSession,
  setSelectedSession,
  startLoadingSession,
  stopLoadingSession,
} = SessionSlice.actions;
