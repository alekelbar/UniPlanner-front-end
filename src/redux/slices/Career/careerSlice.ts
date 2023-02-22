import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CareerState,
  Career,
} from "../../../interfaces/career.interface";

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
    cleanErrors: (state) => {
      return { ...state, error: null };
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { setCareers, setLoading } = careerSlice.actions;

export default careerSlice;
