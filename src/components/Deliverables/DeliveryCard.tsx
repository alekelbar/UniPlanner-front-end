import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { formatDistance, isAfter, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Deliverable, DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelectedDelivery } from '../../redux/slices/Deliveries/deliveriesSlice';
import { startRemoveDelivery } from '../../redux/thunks/deliverables-thunks';

interface DeliveryCardProps {
  deliverable: Deliverable;
  reload: (page?: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
}

export function DeliveryCard ({ deliverable, reload, onOpenEdit, actualPage }: DeliveryCardProps): JSX.Element {
  const deadline = parseISO(deliverable.deadline.toString());

  let create_at: Date | null = null;

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const dispatch = useAppDispatch();
  const router = useRouter();

  const makeStatusDate = () => {
    if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
      if (isAfter(new Date(), deadline)) {
        return (
          <Typography variant="body2" sx={{
            color: (theme) => theme.palette.error.main
          }}>
            No entregado | {formatDistance(deadline, new Date(), { locale: es, addSuffix: true })}
          </Typography>
        );
      }
      return (
        <Typography variant="body2" sx={{
          color: (theme) => theme.palette.warning.main
        }}>
          Se entrega: {formatDistance(deadline, new Date(), { locale: es, addSuffix: true })}
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
    const response = await dispatch(startRemoveDelivery(deliverable));
    if (response !== RESPONSES.SUCCESS) {
      let responseText = "";

      switch (response) {
        case RESPONSES.UNAUTHORIZE:
          responseText = "Parece que no tiene autorización para estar aquí 🔒";
          router.push("/");
          dispatch(onLogOut());
          logOut();
          break;
        case RESPONSES.BAD_REQUEST:
          responseText = 'Parece que todavía te quedan algunas tareas 🔒';
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
        title={deliverable.name}
        subheader={
          <>
            <Typography variant="body2" component="p">
              {deliverable.description}
            </Typography>
            <Typography variant='caption' sx={{
              color: (theme) => theme.palette.info.main
            }}>
              Creado: {
                create_at
                  ? formatDistance(create_at, new Date(), { locale: es, addSuffix: true })
                  : "Desconocido"
              }
            </Typography>
          </>
        }
      />
      <CardContent>
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
                onClick={() => {
                  dispatch(setSelectedDelivery(deliverable));
                  router.push('/home/tasks');
                }}
                fullWidth
                variant='contained'
                color='secondary'>
                Tareas
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button
                fullWidth
                variant='outlined'
                color='success'
                onClick={() => { dispatch(setSelectedDelivery(deliverable)); onOpenEdit(); }}>
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
