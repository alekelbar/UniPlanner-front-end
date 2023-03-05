import { RESPONSES } from "../../interfaces/response-messages";
import { CourseService } from "../../services/Course/course-service";
import {
  addCourse,
  removeCourse,
  setCourses,
  startLoadingCourses,
  stopLoadingCourses,
  updateCourse,
} from "../slices/Courses/coursesSlice";
import { AppDispatch, RootState } from "../store";
import { Course } from "../../interfaces/course.interface";

export const startLoadCourses = (careerId: string, page: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = CourseService.createService("v1");
    const response = await service.getUserCourse(user.id, careerId, page);

    if (typeof response === "string") {
      dispatch(stopLoadingCourses());
      return response;
    }

    const { count, courses } = response.data;
    dispatch(setCourses({ courses, count }));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveCourse = (course: Course) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = CourseService.createService("v1");
    const response = await service.removeCourse(course);

    if (typeof response === "string") {
      dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(removeCourse(response.data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startAddCourse = (
  name: string,
  courseDescription: string,
  credits: number
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());
    const {
      auth: { user },
      career: { selected },
    } = getState();

    if (!user || !selected) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = CourseService.createService("v1");
    const course: Course = {
      name,
      courseDescription,
      credits,
      career: selected._id,
      user: user.id,
    };
    const response = await service.createCourse(course);

    if (typeof response === "string") {
      dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(addCourse(response.data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateCourse = (
  name: string,
  courseDescription: string,
  credits: number
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());
    const {
      auth: { user },
      career: { selected: selectedCareer },
      courses: { selected: selectedCourse },
    } = getState();

    if (!user || !selectedCareer || !selectedCourse) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = CourseService.createService("v1");
    const course: Course = {
      name,
      courseDescription,
      credits,
      career: selectedCareer._id,
      user: user.id,
    };

    const { _id: id } = selectedCourse;
    const response = await service.updateCourse(id as string, course);

    if (typeof response === "string") {
      dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(updateCourse(response.data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};
