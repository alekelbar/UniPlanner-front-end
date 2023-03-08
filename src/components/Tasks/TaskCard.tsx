import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { RESPONSES } from '../../interfaces/response-messages';
import { Task, TASK_STATUS } from '../../interfaces/task-interface';
import { useAppDispatch } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelectedTask } from '../../redux/slices/Tasks/task-slice';
import { startRemoveTask } from '../../redux/thunks/tasks-thunks';

interface TaskCardProps {
  task: Task;
  reload: (page: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
  openClock: () => void;
}

export default function TaskCard ({ task, reload, onOpenEdit, actualPage, openClock }: TaskCardProps): JSX.Element {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveTask(task));
    if (response !== RESPONSES.SUCCESS) {
      let responseText = "";

      switch (response) {
        case RESPONSES.UNAUTHORIZE:
          responseText = "Parece que no tiene autorización para estar aquí 🔒";
          router.push("/auth");
          dispatch(onLogOut());
          logOut();
          break;
        case RESPONSES.BAD_REQUEST:
          responseText = 'Parece que hubo un inconveniente con el servidor 🔒';
          break;
      }
      await Swal.fire({
        title: "Una disculpa",
        text: responseText,
        icon: 'info'
      });
    }
    reload(actualPage);
  };

  return (
    <Card>
      <CardHeader
        title={task.name}
        subheader={
          <>
            <Typography variant="body2" component="p">
              {task.descripcion}
            </Typography>
          </>
        }
      />
      <CardContent>
        <Typography sx={{
          color: (theme) =>
            task.status === TASK_STATUS.COMPLETED
              ? theme.palette.success.main
              : theme.palette.warning.main
        }}>
          Estado: {task.status}
        </Typography>
        <Button
          fullWidth
          variant='contained'
          onClick={() => { dispatch(setSelectedTask(task)); openClock(); }}
          color='secondary'>
          Temporizar
        </Button>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => { dispatch(setSelectedTask(task)); onOpenEdit(); }}
                color='success'>
                Actualizar
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button
                fullWidth
                variant='outlined'
                color='warning'
                onClick={handleRemove}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
