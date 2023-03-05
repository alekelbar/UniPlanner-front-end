import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "../../../interfaces/task-interface";

const initialState: TaskState = {
  tasks: [],
  selected: null,
  error: null,
  loading: false,
  count: 0,
};

export const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    loadTask: (
      state,
      {
        payload,
      }: PayloadAction<{
        count: number;
        tasks: Task[];
      }>
    ) => {
      state.tasks = payload.tasks;
      state.count = payload.count;
    },
    startLoadingTask: (state) => {
      state.loading = true;
    },
    stopLoadingTask: (state) => {
      state.loading = false;
    },
    addTask: (state, { payload }: PayloadAction<Task>) => {
      state.tasks.push(payload);
    },
    removeTask: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((Task) => Task._id !== payload._id);
    },
    setSelectedTask: (state, { payload }: PayloadAction<Task>) => {
      state.selected = payload;
    },
    updateTask: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((Task) => {
        if (Task._id === payload._id) {
          return payload;
        }
        return Task;
      });
    },
  },
});

export const {
  addTask,
  loadTask,
  removeTask,
  setSelectedTask,
  startLoadingTask,
  stopLoadingTask,
  updateTask,
} = TaskSlice.actions;
