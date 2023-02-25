import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Course, CoursesState } from "../../../interfaces/course.interface";

// Define the initial state using that type
const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  loading: true,
  error: null,
  count: 0,
};

export const coursesSlice = createSlice({
  name: "courses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCourses: (
      state,
      { payload }: PayloadAction<{ courses: Course[]; count: number }>
    ) => {
      state.courses = payload.courses;
      state.count = payload.count;
    },
    stopLoadingCourses: (state) => {
      state.loading = false;
    },
    removeCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== payload._id
      );
    },
    startLoadingCourses: (state) => {
      state.loading = true;
    },
    errorCourses: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    setSelectedCourse: (state, { payload }: PayloadAction<Course>) => {
      state.selectedCourse = payload;
    },
    addCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses.push(payload);
    },
  },
});

export const {
  errorCourses,
  setCourses,
  stopLoadingCourses,
  addCourse,
  removeCourse,
  startLoadingCourses,
  setSelectedCourse,
} = coursesSlice.actions;

export default coursesSlice;
