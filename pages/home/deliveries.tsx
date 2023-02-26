import { useTheme } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { GoHome } from '../../src/components';
import { FloatButton } from '../../src/components/common/FloatButton';
import { DeliveryCard } from '../../src/components/Deliverables/DeliveryCard';
import AddDeliveryDialog from '../../src/components/Deliverables/AddDeliveryDialog';
import { logOut } from '../../src/helpers/local-storage';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { onLogOut } from '../../src/redux/slices/auth/authSlice';
import { startLoadDeliveries } from '../../src/redux/thunks/deliverables-thunks';
import { validateToken } from '../../src/services/auth/validate-token';

interface DeliveriesProps {

}

export default function Deliveries ({ }: DeliveriesProps): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected: selectedCourse } = useAppSelector(st => st.courses);
  const { deliverables } = useAppSelector(st => st.deliveries);

  const [deliveries, setDeliveries] = useState(deliverables);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };


  const reload = async (page: number = 1) => {
    if (selectedCourse) {
      const response = await dispatch(startLoadDeliveries(page));
      if (response !== RESPONSES.SUCCESS) {
        if (response === RESPONSES.UNAUTHORIZE) {
          dispatch(onLogOut);
          logOut();
          router.push('/auth');
          await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 🔒');
          return;
        }
        await Swal.fire('Algo salio mal 😥', response);
      }
    }
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    setDeliveries(deliverables);
  }, [deliverables]);


  if (!selectedCourse) return <GoHome />;

  console.log(deliveries);

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.main,
        zIndex: '10'
      }}>
        <Typography
          align='center'
          bgcolor={'secondary'}
          variant='subtitle1'>
          {selectedCourse.name}
        </Typography>
      </Box>
      <Paper variant='elevation'>
        <Grid
          container
          spacing={2}
          direction={'row'}
          justifyContent="start"
          alignItems={'center'}>
          {
            deliveries.length
              ? deliveries.map((delivery, index) => {
                if (index >= 5) return null;
                return (
                  <Grid item xs={12} sm={4} key={delivery._id + delivery.name}>
                    <DeliveryCard reload={reload} deliverable={delivery} key={index} />
                    <Divider variant='fullWidth' />
                  </Grid>
                );
              })
              :
              <Grid item xs={12} sm={12}>
                <Typography align='center' variant='subtitle1' p={5}>No hay entregas disponibles</Typography>
              </Grid>
          }
        </Grid>
        {/* <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                [theme.breakpoints.up("md")]: {
                  fontSize: "large"
                },
              }}
              size="large"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid> */}
      </Paper>
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddDeliveryDialog onClose={onCloseCreate} open={openCreate} />
      {/* <EditCourseDialog onClose={onCloseEdit} open={openEdit} /> */}
    </Stack>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;

    if ((await validateToken(tokenString))) {
      return {
        props: {
        }
      };
    }
  }

  return {
    redirect: {
      destination: '/auth',
      permanent: false,
    },
  };
};