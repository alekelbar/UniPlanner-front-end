import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CareerState,
  Career,
} from "../../../services/API/Career/career.models";

// Define the initial state using that type
const initialState: CareerState = {
  careers: [],
  error: null,
  loading: false,
};

export const careerSlice = createSlice({
  name: "career",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCareers: (state, { payload }: PayloadAction<Career[]>) => {
      return { ...state, careers: payload };
    },
    setErrors: (state, { payload: error }: PayloadAction<string>) => {
      return { ...state, error };
    },
    cleanErrors: (state) => {
      return { ...state, error: null };
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setCareers, setErrors, setLoading } = careerSlice.actions;

export default careerSlice;
