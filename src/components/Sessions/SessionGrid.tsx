import { sessionPageContext } from './context/SessionContext';
import { Divider, Grid, Typography } from '@mui/material';
import SessionCard from '../../../src/components/Sessions/SessionCard';
import { setSelectedSession, useAppDispatch } from '../../../src/redux';
import { useContext } from 'react';



export const SessionGrid = () => {

  const dispatch = useAppDispatch();
  const {
    sessionState: {
      sessions,
      reload
    },
    pagination: {
      actualPage
    },
    clock: {
      onOpenClock
    }
  } = useContext(sessionPageContext);

  return (
    <Grid container p={1} gap={1} direction={'row'} justifyContent="center" alignItems={'center'}>
      {
        sessions.length
          ? sessions.map((session) => {
            return (
              <Grid item xs={12} sm={5} md={4} lg={3} key={session._id + session.name}>
                <SessionCard onStartSession={() => {
                  dispatch(setSelectedSession(session));
                  onOpenClock();
                }} actualPage={actualPage} session={session} reload={reload} />
                <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
              </Grid>
            );
          })
          : <Grid item xs={12} sm={12}>
            <Typography align='center' variant='subtitle1' p={5}>No hay SESSIONES disponibles</Typography>
          </Grid>
      }
    </Grid>
  );
};