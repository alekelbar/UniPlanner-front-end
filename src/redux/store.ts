import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { SessionSlice } from "./slices";
import careerSlice from "./slices/Career/careerSlice";
import coursesSlice from "./slices/Courses/coursesSlice";
import deliveriesSlice from "./slices/Deliveries/deliveriesSlice";
import { settingSlice } from "./slices/Settings/setting-slice";
import { TaskSlice } from "./slices/Tasks/task-slice";
import authSlice from "./slices/auth/authSlice";
import { KanbanSlice } from "./slices/kanban/kanban-slice";

export const reducer = combineReducers({
    setting: settingSlice.reducer,
    auth: authSlice.reducer,
    career: careerSlice.reducer,
    courses: coursesSlice.reducer,
    deliveries: deliveriesSlice.reducer,
    tasks: TaskSlice.reducer,
    sessions: SessionSlice.reducer,
    kanban: KanbanSlice.reducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;
