import { AddCourseDialog } from '../../../src/components/Courses/AddCourseDialog';
import { useContext } from 'react';
import { coursePageContext } from './context/courseContext';


export const CourseAddForm = () => {
  const { dialogHandler: { onCloseCreate, openCreate } } = useContext(coursePageContext);
  return (
    <AddCourseDialog onClose={onCloseCreate} open={openCreate} />
  );
};
