import { Box, Grid, Pagination, Paper, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../../src/components';
import GoHome from '../../src/components/common/Layout/GoHome';
import usePagination from '../../src/hooks/pagination';
import { Course } from '../../src/interfaces/course.interface';
import { useAppSelector, useAppDispatch } from '../../src/redux/hooks';
import { startLoadingCourses } from '../../src/redux/slices/Courses/coursesSlice';
import { startLoadCourses } from '../../src/redux/thunks/courses.thunks';
import { RESPONSES } from '../../src/interfaces/response-messages';
import Swal from 'sweetalert2';
import { CareerState } from '../../src/interfaces/career.interface';
import CourseCard from '../../src/components/Courses/CourseCard';

interface CoursesProps {

}

export default function Courses ({ }: CoursesProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(st => st.career);
  const coursesState = useAppSelector(st => st.courses);
  const { actualPage, handleChangePage, totalPages, setTotalPages } = usePagination(1);

  const [courses, setCourses] = useState<Course[]>(coursesState.courses);


  useEffect(() => {
    // TODO: Realizar el dispatch que carga los cursos correspondientes a la carrera
    (async () => {
      if (selected) {
        const response = await dispatch(startLoadCourses(selected._id, actualPage));

        if (response !== RESPONSES.SUCCESS) {

          if (response === RESPONSES.UNAUTHORIZE) {
            await Swal.fire('Parece que no tienes autorización para ver esto... 😥', response);
            router.push('/auth');
            return;
          }

          await Swal.fire('Algo salio mal 😥', response);
          return;
        }
      }
    })();
  }, []);

  useEffect(() => {
    setCourses(coursesState.courses);
    setTotalPages(Math.trunc(coursesState.count / 5));
  }, [coursesState]);

  if (!selected) return <GoHome />;
  if (coursesState.loading) return <Loading />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.main,
        zIndex: '10'
      }}>
        <Typography align='center' bgcolor={'secondary'} variant='subtitle1'>{selected.name}</Typography>
      </Box>
      <Paper sx={{}}>
        <Grid container direction={'row'} justifyContent="center" alignItems={'center'}>
          {courses.map(course => {
            return (
              <Grid item xs={12} sm={4} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  fontSize: "large"
                },
              }}
              size="small"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
};
