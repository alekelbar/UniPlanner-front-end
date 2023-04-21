import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { FloatButton, Loading } from '../../../src/components';
import AddSessionDialog from '../../../src/components/Sessions/AddSessionDialog';
import { Timer } from '../../../src/components/Sessions/Clock/Timer';
import SessionCard from '../../../src/components/Sessions/SessionCard';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { setSelectedSession } from '../../../src/redux';
import { useSession } from '../../../src/components/Sessions/hooks/useSession';

export default function SessionsPage (): JSX.Element {

  const {
    sessionState: {
      loading,
      selected,
      sessions,
      reload,
      dispatch
    },
    clock: {
      openClock, setOpenClock
    },
    pagination: {
      handleChangePage, totalPages, actualPage
    },
    dialogHandler: {
      openCreate, onOpenCreate, onCloseCreate
    },
    theming: {
      theme
    }
  } = useSession();

  if (loading) return (<Loading called='session/id' />);

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
                pb: 2
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
                  <SessionCard onStartSession={() => {
                    dispatch(setSelectedSession(session));
                    setOpenClock(true);
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
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />

      <AddSessionDialog onClose={onCloseCreate} open={openCreate} />

      <Timer session={selected} dialogHandler={{ open: openClock, onClose: () => { setOpenClock(false); } }} />

    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};