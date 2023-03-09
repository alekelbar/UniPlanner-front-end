import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { GoHome, Loading } from '../../src/components';
import { FloatButton } from '../../src/components/common/FloatButton';
import AddTaskDialog from '../../src/components/Tasks/AddTaskDialog';
import EditTaskDialog from '../../src/components/Tasks/EditTaskDialog';
import TaskCard from '../../src/components/Tasks/TaskCard';
import TimerClock from '../../src/components/Tasks/TimerClock';
import isInteger from '../../src/helpers/isInteger';
import { logOut } from '../../src/helpers/local-storage';
import usePagination from '../../src/hooks/pagination';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { onLogOut } from '../../src/redux/slices/auth/authSlice';
import { startLoadTasks } from '../../src/redux/thunks/tasks-thunks';
import { validateToken } from '../../src/services/auth/validate-token';


interface TaskProps {

}

export default function Tasks ({ }: TaskProps): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected: selectedDelivery } = useAppSelector(st => st.deliveries);
  const taskState = useAppSelector(st => st.tasks);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(taskState.count);

  const [tasks, setTasks] = useState(taskState.tasks);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

  // timer
  const [openClock, setOpenClock] = useState(false);

  const handleCloseClock = () => {
    setOpenClock(false);
  };

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

  const reload = async (page: number = 1) => {
    if (selectedDelivery) {
      const response = await dispatch(startLoadTasks(page));
      if (response !== RESPONSES.SUCCESS) {
        if (response === RESPONSES.UNAUTHORIZE) {
          dispatch(onLogOut);
          logOut();
          router.push('/');
          await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 🔒');
          return;
        }
        await Swal.fire('Algo salio mal 😥', response);
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);


  useEffect(() => {

    if (taskState.tasks.length > 5) {
      reload(actualPage);
    }

    if (taskState.tasks.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    setTasks(taskState.tasks);
    // Cálculo para la paginación
    const pages: number =
      isInteger(taskState.count / 5)
        ? taskState.count / 5
        : Math.floor(taskState.count / 5) + 1;

    setTotalPages(pages);

  }, [taskState]);

  if (!selectedDelivery) return <GoHome />;

  if (taskState.loading) return <Loading />;

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
          {`Tareas del entregable | ${selectedDelivery?.name}`}
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%"
              }}
              size="small"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        gap={1}
        p={2}
        direction={'row'}
        justifyContent="center"
        alignItems={'center'}>
        {
          tasks.length
            ? tasks.map((task, index) => {
              if (index >= 5) return null;
              return (
                <Grid item xs={12} sm={4} md={3} lg={3} key={task._id + task.name} mb={5}>
                  <TaskCard
                    openClock={() => { setOpenClock(true); }}
                    actualPage={actualPage}
                    onOpenEdit={onOpenEdit}
                    reload={reload}
                    task={task}
                    key={task._id + task.name} />
                  <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
                </Grid>
              );
            })
            :
            <Grid item xs={12} sm={12}>
              <Typography align='center' variant='subtitle1' p={5}>No hay tareas disponibles</Typography>
            </Grid>
        }
      </Grid>
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddTaskDialog onClose={onCloseCreate} open={openCreate} />
      <EditTaskDialog onClose={onCloseEdit} open={openEdit} />
      <TimerClock
        open={openClock}
        onClose={() => { setOpenClock(false); }} />
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
      destination: '/',
      permanent: false,
    },
  };
};