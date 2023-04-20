import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  Deliverable,
  DeliverableState,
} from "../../../interfaces/deliveries.interface";

// Define the initial state using that type
const initialState: DeliverableState = {
  deliverables: [],
  loading: false,
  error: null,
  count: 0,
  selected: null,
};

export const deliveriesSlice = createSlice({
  name: "Deliveries",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadDeliveries: (
      state,
      {
        payload,
      }: PayloadAction<{
        count: number;
        deliverables: Deliverable[];
      }>
    ) => {
      state.deliverables = payload.deliverables;
      state.count = payload.count;
    },
    startLoadingDeliveries: (state) => {
      state.loading = true;
    },
    stopLoadingDeliveries: (state) => {
      state.loading = false;
    },
    addDelivery: (state, { payload }: PayloadAction<Deliverable>) => {
      state.deliverables.push(payload);
    },
    removeDelivery: (state, { payload }: PayloadAction<Deliverable>) => {
      state.deliverables = state.deliverables.filter(
        (deliverable) => deliverable._id !== payload._id
      );
      state.count -= 1;
    },
    setSelectedDelivery: (state, { payload }: PayloadAction<Deliverable>) => {
      state.selected = payload;
    },
    updateDeliverable: (state, { payload }: PayloadAction<Deliverable>) => {
      state.deliverables = state.deliverables.map((deliverable) => {
        if (deliverable._id === payload._id) {
          return payload;
        }
        return deliverable;
      });
    },
  },
});

export const {
  updateDeliverable,
  addDelivery,
  loadDeliveries,
  removeDelivery,
  setSelectedDelivery,
  startLoadingDeliveries,
  stopLoadingDeliveries,
} = deliveriesSlice.actions;

export default deliveriesSlice;
