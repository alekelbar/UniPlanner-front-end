import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { formatDistance, isAfter, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Deliverable, DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelectedDelivery } from '../../redux/slices/Deliveries/deliveriesSlice';
import { startRemoveDelivery } from '../../redux/thunks/deliverables-thunks';
import { Loading } from '../common';
import { ColorMatrixPreferences, getPriorityColor } from './../../helpers/priorityCalc';
import { MIN_CARD_HEIGHT } from '../../config/sizes';

interface DeliveryCardProps {
  deliverable: Deliverable;
  reload: (page?: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
}

export function DeliveryCard ({ deliverable, reload, onOpenEdit, actualPage }: DeliveryCardProps): JSX.Element {
  const deadline = parseISO(deliverable.deadline.toString());

  let create_at: Date | null = null;

  const { selected } = useAppSelector(s => s.setting);

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const dispatch = useAppDispatch();
  const router = useRouter();

  const makeStatusDate = () => {
    if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
      if (isAfter(new Date(), deadline)) {
        return (
          <Typography component={'div'} variant="body2" sx={{
            color: (theme) => theme.palette.error.main
          }}>
            No entregado | {formatDistance(deadline, new Date(), { locale: es, addSuffix: true })}
          </Typography>
        );
      }
      return (
        <Typography component={'div'} variant="body2" sx={{
          color: (theme) => theme.palette.warning.main
        }}>
          Se entrega: {formatDistance(deadline, new Date(), { locale: es, addSuffix: true })}
        </Typography>
      );
    }

    return (
      <Typography component={'div'} variant="body2" sx={{
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

  if (!selected) return <Loading />;
  const { importance, urgency } = deliverable;
  const { do: doing, delegate, ignore, prepare } = selected;

  const userMatrizColor: ColorMatrixPreferences = {
    delegate,
    do: doing,
    ignore,
    prepare
  };

  const colorSeleted = getPriorityColor(importance, urgency, userMatrizColor);

  return (
    <Card variant='elevation' sx={{
      minHeight: MIN_CARD_HEIGHT,
    }}>
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
          <Stack direction={'row'} justifyContent={'start'} alignItems={'baseline'}>
            <Box sx={{
              px: 2,
              width: '64px',
              height: '5px',
              borderRadius: '8px'
            }} component={'div'} bgcolor={colorSeleted} />
          </Stack>
        </Typography>
        <Typography sx={{
          color: (theme) => theme.palette.text.secondary
        }}>
          Calificación: {deliverable.note}
        </Typography>
        <Typography sx={{
          color: (theme) => theme.palette.text.secondary
        }}>
          Valor: {deliverable.percent}%
        </Typography>
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                onClick={() => {
                  dispatch(setSelectedDelivery(deliverable));
                  router.push('/home/tasks');
                }}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(.9)',
                  },
                }}
                fullWidth
                variant='contained'
                color='secondary'>
                VER TAREAS
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
                color='error'
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
