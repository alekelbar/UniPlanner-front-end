import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  DELIVERABLE_TAGS,
  Deliverable,
  DeliverableState,
} from "../../../interfaces/deliveries.interface";
import { format } from "date-fns";

// Define the initial state using that type
const initialState: DeliverableState = {
  deliverables: [],
  loading: false,
  error: null,
  count: 0,
  selected: {
    deadline: "2023-01-19T00:00:00.000+00:00",
    description: "",
    importance: DELIVERABLE_TAGS.IMPORTANT,
    name: "",
    note: 1,
    percent: 1,
    status: "",
    urgency: DELIVERABLE_TAGS.NOT_URGENT,
    _id: "",
    course: "",
    createdAt: new Date(),
  },
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
