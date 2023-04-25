import { createContext } from 'react';
import { Course } from '../../../../src/interfaces/course.interface';

interface CoursePageContext {
  coursesState: {
    careerName: string | string[] | undefined,
    courses: Course[],
    loading: boolean,
    reload: (page: number) => void;
  },
  pagination: {
    actualPage: number,
    handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void,
    totalPages: number,
  },
  dialogHandler: {
    openCreate: boolean,
    openEdit: boolean,
    onCloseCreate: VoidFunction,
    onCloseEdit: VoidFunction,
    onOpenEdit: VoidFunction,
    onOpenCreate: VoidFunction;
  };
}

export const coursePageContext = createContext({} as CoursePageContext);
export const { Provider: CourseProvider } = coursePageContext;