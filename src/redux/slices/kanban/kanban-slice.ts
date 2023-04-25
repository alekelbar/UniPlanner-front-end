import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { KanbanTaskModel } from "./models/taskModel";

interface KanbanState {
  tasks: KanbanTaskModel[];
  loading: boolean;
}

const initialState: KanbanState = {
  loading: false,
  tasks: [],
};

export const KanbanSlice = createSlice({
  name: "Kanban",
  initialState,
  reducers: {
    loadTask(state, { payload }: PayloadAction<KanbanTaskModel[]>) {
      state.tasks = payload;
    },
    removeTask(state, { payload }: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id === payload);
    },
    addTask(state, { payload }: PayloadAction<KanbanTaskModel>) {
      state.tasks.push(payload);
    },
    setStatus(
      state,
      {
        payload: { status, task },
      }: PayloadAction<{ status: string; task: KanbanTaskModel }>
    ) {
      state.tasks = state.tasks.filter((e) => {
        if (task.id === e.id) {
          e.status = status;
        }
        return e;
      });
    },
  },
});

export const { loadTask, addTask, removeTask, setStatus } = KanbanSlice.actions;
