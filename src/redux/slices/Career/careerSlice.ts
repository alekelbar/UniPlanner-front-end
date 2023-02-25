import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Career, CareerState } from "../../../interfaces/career.interface";

// Define the initial state using that type
const initialState: CareerState = {
  careers: [],
  error: null,
  loading: true,
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
    StopLoadingCareer: (state) => {
      state.loading = false;
    },
    StartLoadingCareer: (state) => {
      state.loading = true;
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

export const {
  setCareers,
  StopLoadingCareer,
  StartLoadingCareer,
  addCareer,
  removeCareer,
  setSelectedCareer,
} = careerSlice.actions;

export default careerSlice;
