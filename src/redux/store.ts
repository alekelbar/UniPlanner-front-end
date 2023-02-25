import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import careerSlice from "./slices/Career/careerSlice";
import coursesSlice from "./slices/Courses/coursesSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    career: careerSlice.reducer,
    courses: coursesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
