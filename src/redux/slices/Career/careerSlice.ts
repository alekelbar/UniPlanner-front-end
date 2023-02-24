import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CareerState, Career } from "../../../interfaces/career.interface";

// Define the initial state using that type
const initialState: CareerState = {
  careers: [],
  error: null,
  loading: false,
  selected: null,
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
    addCareer: (state, { payload }: PayloadAction<Career>) => {
      state.careers.push(payload);
    },
    removeCareer: (state, { payload }: PayloadAction<Career>) => {
      state.careers = state.careers.filter((e) => e._id !== payload._id);
    },
    setSelectedCareer: (state, { payload }: PayloadAction<Career>) => {
      state.selected = payload;
    },
  },
});

export const { setCareers, setLoading, addCareer, removeCareer, setSelectedCareer } =
  careerSlice.actions;

export default careerSlice;
