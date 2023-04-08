import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { SessionSlice } from "./slices";
import careerSlice from "./slices/Career/careerSlice";
import coursesSlice from "./slices/Courses/coursesSlice";
import deliveriesSlice from "./slices/Deliveries/deliveriesSlice";
import { settingSlice } from "./slices/Settings/setting-slice";
import { TaskSlice } from "./slices/Tasks/task-slice";
import authSlice from "./slices/auth/authSlice";
import { KanbanSlice } from "./slices/kanban/kanban-slice";

// ...

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["setting", "courses", "deliveries", "tasks", "sessions"],
};

const reducer = combineReducers({
  setting: settingSlice.reducer,
  auth: authSlice.reducer,
  career: careerSlice.reducer,
  courses: coursesSlice.reducer,
  deliveries: deliveriesSlice.reducer,
  tasks: TaskSlice.reducer,
  sessions: SessionSlice.reducer,
  kanban: KanbanSlice.reducer,
});

const persistReducers = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
