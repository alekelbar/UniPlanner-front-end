import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../../store.redux";
import { UserCredentials } from "../../../services/API/User/users.models";
import {
  CareerState,
  Career,
} from "../../../services/API/Career/career.models";

// Define the initial state using that type
const initialState: CareerState = {
  careers: [],
  errors: null,
};

export const careerSlice = createSlice({
  name: "career",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCareers: (state, { payload }: PayloadAction<Career[]>) => {
      return { ...state, careers: payload };
    },
  },
});

export const { setCareers } = careerSlice.actions;

export default careerSlice;
