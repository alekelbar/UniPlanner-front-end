import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FloatButton, Loading } from '../../src/components';
import AddSessionDialog from '../../src/components/Sessions/AddSessionDialog';
import SessionCard from '../../src/components/Sessions/SessionCard';
import isInteger from '../../src/helpers/isInteger';
import usePagination from '../../src/hooks/pagination';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { Session } from '../../src/interfaces/session-interface';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { startLoadSession } from '../../src/redux/thunks/session-thunks';

export default function Sessions (): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const sessionsState = useAppSelector(st => st.sessions);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(sessionsState.count);

  const [sessions, setCourses] = useState<Session[]>(sessionsState.sessions);

  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const reload = async (page: number = 1) => {
    const response = await dispatch(startLoadSession(page));

    if (response !== RESPONSES.SUCCESS) {

      if (response === RESPONSES.UNAUTHORIZE) {
        router.push('/auth');
        await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 😥', response);
        return;
      }

      await Swal.fire('Algo salio mal 😥', response);
      return;
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {

    if (sessionsState.sessions.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (sessionsState.sessions.length > 5) {
      reload(actualPage);
    }

    setCourses(sessionsState.sessions);

    // Cálculo para la paginación
    const pages: number =
      isInteger(sessionsState.count / 5)
        ? sessionsState.count / 5
        : Math.floor(sessionsState.count / 5) + 1;

    setTotalPages(pages);

  }, [sessionsState]);

  if (sessionsState.loading) return <Loading />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.dark,
        zIndex: '10'
      }}>
        <Typography align='center' bgcolor={'secondary'} variant='subtitle1'>{`Sessiones de Usuario`}</Typography>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  fontSize: "large"
                },
              }}
              size="small"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container p={1} gap={1} direction={'row'} justifyContent="center" alignItems={'center'}>
        {
          sessions.length
            ? sessions.map((session) => {
              return (
                <Grid item xs={12} sm={5} md={4} lg={3} key={session._id + session.name}>
                  <SessionCard actualPage={actualPage} session={session} reload={reload} />
                  <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
                </Grid>
              );
            })
            : <Grid item xs={12} sm={12}>
              <Typography align='center' variant='subtitle1' p={5}>No hay SESSIONES disponibles</Typography>
            </Grid>
        }
      </Grid>
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddSessionDialog onClose={onCloseCreate} open={openCreate} />
    </Stack>
  );
}
