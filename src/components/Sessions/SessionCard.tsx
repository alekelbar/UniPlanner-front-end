import { Button, Card, CardActions, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { MIN_CARD_HEIGHT } from '../../config/sizes';
import { RESPONSES } from '../../interfaces/response-messages';
import { SESSION_TYPES, Session } from '../../interfaces/session-interface';
import { useAppDispatch } from '../../redux';
import { startRemoveSession } from '../../redux/thunks/session-thunks';


interface SessionCardProps {
  session: Session;
  reload: (page: number) => void;
  actualPage: number;
  onStartSession: () => void;
}

export default function SessionCard ({ actualPage, reload, session, onStartSession }:
  SessionCardProps): JSX.Element {
  const { duration, name, type } = session;

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const response = await dispatch(startRemoveSession(session));
    if (response !== RESPONSES.SUCCESS) {
      Swal.fire(response);
    }
    reload(actualPage);
  };

  return (
    <Card variant='elevation' data-testid="session-card" sx={{
      minHeight: MIN_CARD_HEIGHT,
    }}>
      <CardHeader
        title={name}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
        subheader={
          <Tooltip title='Cantidad de creditos correspondientes a esta materia' placement='top-start'>
            <Typography variant="subtitle1" sx={{
              color: (theme) =>
                (session.type === SESSION_TYPES.RESTING)
                  ? theme.palette.success.main
                  : theme.palette.info.main,
            }} gutterBottom>
              {type} : {duration} minutos
            </Typography>
          </Tooltip>
        }
      />
      <CardContent>
        <Button
          fullWidth variant='contained'
          color='secondary'
          onClick={() => {
            onStartSession();
          }}
        >Iniciar la sesión
        </Button>
        <CardActions>
          <Button
            variant='outlined'
            color='error'
            onClick={handleDelete}>
            Eliminar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
