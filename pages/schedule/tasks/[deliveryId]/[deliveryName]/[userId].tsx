import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Loading, NotFoundPage } from '../../../../../src/components';
import AddTaskDialog from '../../../../../src/components/Tasks/AddTaskDialog';
import EditTaskDialog from '../../../../../src/components/Tasks/EditTaskDialog';
import TaskCard from '../../../../../src/components/Tasks/TaskCard';
import TimerClock from '../../../../../src/components/Tasks/TimerClock';
import { FloatButton } from '../../../../../src/components/common/FloatButton';
import isInteger from '../../../../../src/helpers/isInteger';
import { isValidToken } from '../../../../../src/helpers/isValidToken';
import { logOut } from '../../../../../src/helpers/local-storage';
import usePagination from '../../../../../src/hooks/pagination';
import { RESPONSES } from '../../../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../../../src/redux';
import { onLogOut } from '../../../../../src/redux/slices/auth/authSlice';
import { startLoadTasks } from '../../../../../src/redux/thunks/tasks-thunks';


interface TaskProps {

}

export default function TasksPage ({ }: TaskProps): JSX.Element {
  const { query: { deliveryId, deliveryName, userId } } = useRouter();
  const dispatch = useAppDispatch();

  const { selected: selectedDelivery } = useAppSelector(st => st.deliveries);
  const { tasks, count, loading } = useAppSelector(st => st.tasks);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

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
      const response = await dispatch(startLoadTasks(deliveryId as string, page));
      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);


  useEffect(() => {

    if (tasks.length > 5) {
      reload(actualPage);
    }

    if (tasks.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }
    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [tasks]);

  if (!selectedDelivery) return <NotFoundPage />;

  if (loading) return <Loading called='task' />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.secondary.main,
        zIndex: '10'
      }}>
        <Typography
          mt={2}
          align='center'
          color={'primary'}
          variant='subtitle1'>
          {`${deliveryName}`}
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                py: 1
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
        onClose={handleCloseClock} />
    </Stack>
  );
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};