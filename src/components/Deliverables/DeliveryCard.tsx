import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { format, formatDistance, isAfter, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { Deliverable, DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { useAppSelector } from '../../redux';
import GoHome from '../common/Layout/GoHome';

interface DeliveryCardProps {
  deliverable: Deliverable;
}

export function DeliveryCard ({ deliverable }: DeliveryCardProps): JSX.Element {
  const deadline = parseISO(deliverable.deadline.toString());

  const makeStatusDate = () => {
    if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
      if (isAfter(new Date(), deadline)) {
        return (
          <Typography variant="body2" sx={{
            color: (theme) => theme.palette.error.main
          }}>
            No entregado
          </Typography>
        );
      }
      return (
        <Typography variant="body2" sx={{
          color: (theme) => theme.palette.warning.main
        }}>
          Tiempo: {formatDistance(deadline, new Date(), { locale: es })}
        </Typography>
      );
    }

    return (
      <Typography variant="body2" sx={{
        color: (theme) => theme.palette.success.main
      }}>
        Entregado
      </Typography>
    );
  };


  return (
    <Card>
      <CardHeader
        title={deliverable.name}
        subheader={
          <Typography variant="body2" component="p">
            {deliverable.description}
          </Typography>
        }
      />
      <CardContent>
        <Typography sx={{
          color: (theme) => theme.palette.text.secondary
        }}>
          Estado: {deliverable.status}
        </Typography>
        {makeStatusDate()}
        <Typography sx={{
          color: (theme) => theme.palette.text.secondary
        }}>
          Calificación: {deliverable.note}
        </Typography>
        <Typography sx={{
          color: (theme) => theme.palette.text.secondary
        }}>
          Porcentaje: {deliverable.percent}%
        </Typography>

        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4}>
              <Button fullWidth variant='outlined' color='success'>Actualizar</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button fullWidth variant='outlined' color='warning'>Eliminar</Button>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button fullWidth variant='outlined' color='info'>Tareas</Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
