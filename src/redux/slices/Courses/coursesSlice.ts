import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Course, CoursesState } from "../../../interfaces/course.interface";

// Define the initial state using that type
const initialState: CoursesState = {
  courses: [],
  loading: true,
  error: null,
  count: 0,
  selected: null,
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
      state.count -= 1;
    },
    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((course) =>
        course._id === payload._id ? payload : course
      );
    },
    startLoadingCourses: (state) => {
      state.loading = true;
    },
    errorCourses: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    addCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses.push(payload);
      state.count += 1;
    },
    setSelectedCourse: (state, { payload }: PayloadAction<Course>) => {
      state.selected = payload;
    },
  },
});

export const {
  errorCourses,
  setCourses,
  stopLoadingCourses,
  addCourse,
  removeCourse,
  updateCourse,
  startLoadingCourses,
  setSelectedCourse,
} = coursesSlice.actions;

export default coursesSlice;
