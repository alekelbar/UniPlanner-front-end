import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Stack, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AddCourseDialog } from '../../src/components/Courses/AddCourseDialog';
import CourseCard from '../../src/components/Courses/CourseCard';
import { EditCourseDialog } from '../../src/components/Courses/EditCourseDialog';
import NotFoundPage from '../../src/components/Layout/NotFoundPage';
import { FloatButton } from '../../src/components/common/FloatButton';
import isInteger from '../../src/helpers/isInteger';
import { isValidToken } from '../../src/helpers/isValidToken';
import usePagination from '../../src/hooks/pagination';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { startLoadCourses } from '../../src/redux/thunks/courses.thunks';
import { Loading } from '../../src/components';

interface CoursesProps {

}

export default function CoursesPage ({ }: CoursesProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector(st => st.career);
  const { courses, count, loading } = useAppSelector(st => st.courses);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

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
          router.push('/');
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

    if (courses.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (courses.length > 5) {
      reload(actualPage);
    }

    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [courses]);

  if (!selected) return <NotFoundPage />;
  if (loading) return <Loading />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.dark,
        zIndex: '10'
      }}>
        <Typography
          align='center'
          bgcolor={'secondary'}
          variant='subtitle1'>
          {`${selected.name}`}
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  fontSize: "large"
                },
                py: 1
              }}
              size="small"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
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
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};