import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../../interfaces/users.interface";
import { getLocalToken } from "../../../helpers/local-storage";

// Define the initial state using that type
const initialState: UserState = getLocalToken() || {
  token: null,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAuth: (_, { payload }: PayloadAction<UserState>) => {
      return { ...payload };
    },
    onLogOut: (_) => {
      return initialState;
    },
  },
});

export const { setAuth, onLogOut } = authSlice.actions;

export default authSlice;
