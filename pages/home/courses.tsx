import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Paper, Stack, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Loading } from '../../src/components';
import { FloatButton } from '../../src/components/common/FloatButton';
import GoHome from '../../src/components/common/Layout/GoHome';
import { AddCourseDialog } from '../../src/components/Courses/AddCourseDialog';
import CourseCard from '../../src/components/Courses/CourseCard';
import { EditCourseDialog } from '../../src/components/Courses/EditCourseDialog';
import isInteger from '../../src/helpers/isInteger';
import usePagination from '../../src/hooks/pagination';
import { Course } from '../../src/interfaces/course.interface';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { startLoadCourses } from '../../src/redux/thunks/courses.thunks';
import { validateToken } from '../../src/services/auth/validate-token';

interface CoursesProps {

}

export default function Courses ({ }: CoursesProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(st => st.career);
  const coursesState = useAppSelector(st => st.courses);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(coursesState.count);

  const [courses, setCourses] = useState<Course[]>(coursesState.courses);
  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const reload = async (page: number) => {
    if (selected) {
      const response = await dispatch(startLoadCourses(selected._id, page));

      if (response !== RESPONSES.SUCCESS) {

        if (response === RESPONSES.UNAUTHORIZE) {
          router.push('/auth');
          await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 😥', response);
          return;
        }

        await Swal.fire('Algo salio mal 😥', response);
        return;
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {
    setCourses(coursesState.courses);

    // Cálculo para la paginación
    const pages: number =
      isInteger(coursesState.count / 5)
        ? coursesState.count / 5
        : Math.floor(coursesState.count / 5) + 1;

    setTotalPages(pages);

  }, [coursesState]);

  if (!selected) return <GoHome />;
  if (coursesState.loading) return <Loading />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.dark,
        zIndex: '10'
      }}>
        <Typography align='center' bgcolor={'secondary'} variant='subtitle1'>{selected.name}</Typography>
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
      </Box>
      <Paper variant='elevation'>
        <Grid container spacing={2} direction={'row'} justifyContent="start" alignItems={'center'}>
          {
            courses.length
              ? courses.map((course, index) => {
                if (index >= 5) return null;
                return (
                  <Grid item xs={12} sm={4} key={course._id + course.name} mb={5}>
                    <CourseCard onOpenEdit={onOpenEdit} course={course} reload={reload} />
                    <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
                  </Grid>
                );
              })
              : <Grid item xs={12} sm={12}>
                <Typography align='center' variant='subtitle1' p={5}>No hay cursos disponibles</Typography>
              </Grid>
          }
        </Grid>
      </Paper>
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddCourseDialog onClose={onCloseCreate} open={openCreate} />
      <EditCourseDialog onClose={onCloseEdit} open={openEdit} />
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;

    if ((await validateToken(tokenString))) {
      return {
        props: {
        }
      };
    }
  }

  return {
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  };
};
