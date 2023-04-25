import { EditCourseDialog } from '../../../src/components/Courses/EditCourseDialog';
import { useContext } from 'react';
import { coursePageContext } from './context/courseContext';


export const CourseEditForm = () => {
  const { dialogHandler: { onCloseEdit, openEdit } } = useContext(coursePageContext);
  return (
    <EditCourseDialog onClose={onCloseEdit} open={openEdit} />
  );
};