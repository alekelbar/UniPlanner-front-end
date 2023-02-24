import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Course, CoursesState } from "../../../interfaces/course.interface";

// Define the initial state using that type
const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

export const coursesSlice = createSlice({
  name: "courses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },
    loadingCourses: (state) => {
      state.loading = !state.loading;
    },
    errorCourses: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setSelectedCourse: (state, { payload }: PayloadAction<Course>) => {
      state.selectedCourse = payload;
    },
  },
});

export const { errorCourses, loadCourses, loadingCourses, setSelectedCourse } =
  coursesSlice.actions;

export default coursesSlice;
