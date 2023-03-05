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
}

export default function TaskCard ({ task, reload, onOpenEdit }: TaskCardProps): JSX.Element {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const deleted = await dispatch(startRemoveTask(task));
    if (deleted !== RESPONSES.SUCCESS) {
      switch (deleted) {
        case RESPONSES.UNAUTHORIZE:
          await Swal.fire('Parece que no estas autorizado para ver esto 🔒');
          dispatch(onLogOut());
          logOut();
          router.push('/auth');
          break;
        case RESPONSES.BAD_REQUEST:
          await Swal.fire('Lo lamentamos, ocurrio un error 😱', deleted);
          break;
      }
      return;
    }
    await Swal.fire('Listo, esa tarea se marcho de nuestra vidas 🐶');
    reload(1);
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
