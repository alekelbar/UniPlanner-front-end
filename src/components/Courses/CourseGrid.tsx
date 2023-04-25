import { Divider, Grid, Typography } from '@mui/material';
import CourseCard from '../../../src/components/Courses/CourseCard';
import { useContext } from 'react';
import { coursePageContext } from './context/courseContext';


export const CourseGrid = () => {

  const {
    coursesState: { courses, reload },
    dialogHandler: { onOpenEdit },
    pagination: {
      actualPage
    }
  } = useContext(coursePageContext);

  return (
    <Grid container p={1} gap={1} direction={'row'} justifyContent="center" alignItems={'center'}>
      {
        courses.length
          ? courses.map((course) => {
            return (
              <Grid item xs={12} sm={5} md={4} lg={3} key={course._id + course.name}>
                <CourseCard actualPage={actualPage} onOpenEdit={onOpenEdit} course={course} reload={reload} />
                <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
              </Grid>
            );
          })
          : <Grid item xs={12} sm={12}>
            <Typography align='center' variant='subtitle1' p={5}>No hay cursos disponibles</Typography>
          </Grid>
      }
    </Grid>
  );
};
