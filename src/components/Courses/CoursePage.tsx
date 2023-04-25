import { Stack } from '@mui/material';
import { Loading } from '../../../src/components';
import { useCourses } from '../../../src/components/Courses/hooks/useCourses';
import { ReactElement } from 'react';
import { CourseProvider } from './context/courseContext';
import { CoursePaginationHero } from './CoursePaginationHero';
import { CourseGrid } from './CourseGrid';
import { CourseFloatButton } from './CourseFloatButton';
import { CourseAddForm } from './CourseAddForm';
import { CourseEditForm } from './CourseEditForm';

export default function CoursesPage ({ children }: { children: ReactElement | ReactElement[]; }) {
  const context = useCourses();

  if (context.coursesState.loading) return <Loading called='courses' />;

  return (
    <CourseProvider value={context}>
      <Stack direction="column" sx={{ borderRadius: '.8em' }}>
        {children}
      </Stack>
    </CourseProvider>
  );
}

CoursesPage.HeroPagination = CoursePaginationHero;
CoursesPage.Grid = CourseGrid;
CoursesPage.AddButton = CourseFloatButton;
CoursesPage.AddForm = CourseAddForm;
CoursesPage.EditForm = CourseEditForm;