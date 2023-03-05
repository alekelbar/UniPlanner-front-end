import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getLocalToken } from "../../../helpers/local-storage";
import { UserState, UserToken } from "../../../interfaces/users.interface";

// Define the initial state using that type
const initialState: UserState = getLocalToken() || {
  token: null,
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (_, { payload }: PayloadAction<UserState>) => {
      return { ...payload };
    },
    initLoadingApp: (state) => {
      state.loading = true;
    },
    stopLoadingApp: (state) => {
      state.loading = false;
    },
    onLogOut: (_) => {
      return initialState;
    },
    onUpdateUser: (state, { payload }: PayloadAction<UserToken>) => {
      return { ...state, user: { ...payload } };
    },
  },
});

export const { setAuth, onLogOut, onUpdateUser, initLoadingApp, stopLoadingApp } =
  authSlice.actions;

export default authSlice;
