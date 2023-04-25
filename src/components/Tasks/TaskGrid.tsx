import { Divider, Grid, Typography } from '@mui/material';
import TaskCard from '../../../src/components/Tasks/TaskCard';
import { useContext } from 'react';
import { taskPageContext } from './context/TaskPageContext';


export const TaskGrid = () => {

  const {
    dialogHandler: {
      handleOpenClock,
      onOpenEdit
    },
    pagination: {
      actualPage,
    },
    tasksState: {
      reload,
      tasks
    }
  } = useContext(taskPageContext);

  return (
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
                  openClock={handleOpenClock}
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
    </Grid>);
};