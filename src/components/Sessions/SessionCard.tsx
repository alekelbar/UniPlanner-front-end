import { Button, Card, CardActions, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { RESPONSES } from '../../interfaces/response-messages';
import { Session, SESSION_TYPES } from '../../interfaces/session-interface';
import { setSelectedSession, useAppDispatch } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
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
  const router = useRouter();

  const handleDelete = async () => {
    const response = await dispatch(startRemoveSession(session));
    if (response !== RESPONSES.SUCCESS) {
      let responseText = "";
      switch (response) {
        case RESPONSES.UNAUTHORIZE:
          responseText = "Parece que no tiene autorización para estar aquí 🔒";
          router.push("/auth");
          dispatch(onLogOut());
          logOut();
          return;
        case RESPONSES.BAD_REQUEST:
          responseText = 'Parece que hubo un error 🔒';
        case RESPONSES.INTERNAL_SERVER_ERROR:
          responseText = 'Parece que hubo un error de servidor 🔒';
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
    <Card variant='elevation'>
      <CardHeader
        title={name}
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
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
            color='warning'
            onClick={handleDelete}>
            Eliminar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
