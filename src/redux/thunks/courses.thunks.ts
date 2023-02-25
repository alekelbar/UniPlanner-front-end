import { RESPONSES } from "../../interfaces/response-messages";
import { CourseService } from "../../services/Course/course-service";
import {
  removeCourse,
  setCourses,
  startLoadingCourses,
  stopLoadingCourses,
} from "../slices/Courses/coursesSlice";
import { AppDispatch, RootState } from "../store";
import { Course } from '../../interfaces/course.interface';

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

    if (typeof response !== "string") {
      const { count, courses } = response.data;
      dispatch(setCourses({ courses, count }));
      dispatch(stopLoadingCourses());
      return RESPONSES.SUCCESS;
    }

    return response;
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

    if (typeof response !== "string") {
      dispatch(removeCourse(response.data));
      dispatch(stopLoadingCourses());
      return RESPONSES.SUCCESS;
    }

    return response;
  };
};
