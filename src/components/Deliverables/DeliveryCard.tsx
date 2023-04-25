import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { formatDistance, isAfter, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { MIN_CARD_HEIGHT } from '../../config/sizes';
import { DELIVERABLE_STATUS, Deliverable } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setSelectedDelivery } from '../../redux/slices/Deliveries/deliveriesSlice';
import { startRemoveDelivery } from '../../redux/thunks/deliverables-thunks';
import { ColorMatrixPreferences, getPriorityColor } from '../Career/helpers/priorityCalc';
import { useEffect } from 'react';
import { startLoadSetting } from '../../redux/thunks/settings-thunks';
import { Loading } from '../common';

interface DeliveryCardProps {
  deliverable: Deliverable;
  reload: (page?: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
}

export function DeliveryCard ({ deliverable, reload, onOpenEdit, actualPage }: DeliveryCardProps): JSX.Element {

  const { selected, loading } = useAppSelector(state => state.setting);

  const { query: { userId, courseId } } = useRouter();

  let create_at: Date = new Date();
  const deadline = parseISO(deliverable.deadline.toString());

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const onLoad = async () => {
    const response = await dispatch(startLoadSetting(userId as string));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  };

  useEffect(() => {
    if (!selected.user) // verificando si es la configuración por defecto...
      onLoad();
  }, [userId]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const makeStatusDate = () => {
    if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
      if (isAfter(new Date(), deadline)) {
        return (
          <Typography component={'div'} variant="h6" sx={{
            color: (theme) => theme.palette.error.main
          }}>
            {formatDistance(deadline, new Date(), { locale: es, addSuffix: true }).toUpperCase()}
          </Typography>
        );
      }
      return (
        <Typography component={'div'} variant="h6" sx={{
          color: (theme) => theme.palette.warning.main
        }}>
          {formatDistance(deadline, new Date(), { locale: es, addSuffix: true }).toUpperCase()}
        </Typography>
      );
    }

    return (
      <Typography component={'div'} variant="h6" sx={{
        color: (theme) => theme.palette.success.main
      }}>
        Entregado
      </Typography>
    );
  };

  const handleRemove = async () => {
    const response = await dispatch(startRemoveDelivery({ ...deliverable, _id: deliverable._id, course: courseId as string }));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
    reload(actualPage);
  };

  const { importance, urgency } = deliverable;
  const { do: doing, delegate, ignore, prepare } = selected;

  const userMatrizColor: ColorMatrixPreferences = {
    delegate,
    do: doing,
    ignore,
    prepare
  };

  const colorSeleted = getPriorityColor(importance, urgency, userMatrizColor);

  if (loading) return <Loading />;

  return (
    <Card variant='elevation' data-testid="career-card" sx={{
      minHeight: MIN_CARD_HEIGHT,
      // maxHeight: MAX_CARD_HEIGHT,
      // overflow: 'auto'
    }}>
      <CardHeader
        title={deliverable.name}
        titleTypographyProps={{
          variant: 'h5'
        }}
        subheader={
          <>
            <Typography variant="caption" component="p">
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
                  router.push(`/schedule/tasks/${deliverable._id}/${deliverable.name}/${userId}`);
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
