import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { format, formatDistance, isAfter, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Deliverable, DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startremoveDelivery } from '../../redux/thunks/deliverables-thunks';
import GoHome from '../common/Layout/GoHome';

interface DeliveryCardProps {
  deliverable: Deliverable;
  reload: (page: number) => void;
}

export function DeliveryCard ({ deliverable, reload }: DeliveryCardProps): JSX.Element {
  const deadline = parseISO(deliverable.deadline.toString());
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const handleRemove = async () => {
    const deleted = await dispatch(startremoveDelivery(deliverable));
    if (deleted !== RESPONSES.SUCCESS) {
      switch (deleted) {
        case RESPONSES.UNAUTHORIZE:
          await Swal.fire('Parece que no estas autorizado para ver esto 🔒');
          dispatch(onLogOut());
          logOut();
          router.push('/auth');
          break;
        case RESPONSES.BAD_REQUEST:
          await Swal.fire('Parece ser que este curso tiene todavía algunos entregables 😱');
          break;
      }
      return;
    }
    await Swal.fire('Listo, ese curso se marcho de nuestra vidas 🐶');
    reload(1);
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
              <Button
                fullWidth
                variant='outlined'
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
            <Grid item xs={12} md={6} lg={4}>
              <Button
                fullWidth
                variant='contained'
                color='secondary'>
                Tareas
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
