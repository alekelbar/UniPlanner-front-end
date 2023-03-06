import { configureStore } from "@reduxjs/toolkit";
import { SessionSlice } from "./slices";
import authSlice from "./slices/auth/authSlice";
import careerSlice from "./slices/Career/careerSlice";
import coursesSlice from "./slices/Courses/coursesSlice";
import deliveriesSlice from "./slices/Deliveries/deliveriesSlice";
import { TaskSlice } from "./slices/Tasks/task-slice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    career: careerSlice.reducer,
    courses: coursesSlice.reducer,
    deliveries: deliveriesSlice.reducer,
    tasks: TaskSlice.reducer,
    sessions: SessionSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
