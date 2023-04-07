import { useTheme } from '@emotion/react';
import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { GoHome, Loading } from '../../src/components';
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
import usePagination from '../../src/hooks/pagination';
import isInteger from '../../src/helpers/isInteger';
import EditDeliverableDialog from '../../src/components/Deliverables/EditDeliverableDialog';

interface DeliveriesProps {

}

export default function DeliveriesPage ({ }: DeliveriesProps): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected: selectedCourse } = useAppSelector(st => st.courses);
  const deliverablesState = useAppSelector(st => st.deliveries);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(deliverablesState.count);

  const [deliveries, setDeliveries] = useState(deliverablesState.deliverables);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };


  const reload = async (page: number = 1) => {
    if (selectedCourse) {
      const response = await dispatch(startLoadDeliveries(page));
      if (response !== RESPONSES.SUCCESS) {
        if (response === RESPONSES.UNAUTHORIZE) {
          dispatch(onLogOut);
          logOut();
          router.push('/');
          await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 🔒');
          return;
        }
        await Swal.fire('Algo salio mal 😥', response);
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);


  useEffect(() => {

    if (deliverablesState.deliverables.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (deliverablesState.deliverables.length > 5) {
      reload(actualPage);
    }

    setDeliveries(deliverablesState.deliverables);

    // Cálculo para la paginación
    const pages: number =
      isInteger(deliverablesState.count / 5)
        ? deliverablesState.count / 5
        : Math.floor(deliverablesState.count / 5) + 1;

    setTotalPages(pages);

  }, [deliverablesState]);


  if (!selectedCourse) return <GoHome />;
  if (deliverablesState.loading) return <Loading />;

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <Box component={'div'} position='sticky' top={0} sx={{
        backgroundColor: ({ palette }) => palette.primary.dark,
        zIndex: '10'
      }}>
        <Typography
          align='center'
          bgcolor={'secondary'}
          variant='subtitle1'>
          {`${selectedCourse.name}`}
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
          <Grid item>
            <Pagination
              page={actualPage}
              sx={{
                width: "100%",
                py: 1
              }}
              size="small"
              count={totalPages}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        gap={1}
        p={2}
        direction={'row'}
        justifyContent="center"
        alignItems={'center'}>
        {
          deliveries.length
            ? deliveries.map((delivery) => {
              return (
                <Grid item xs={12} sm={5} md={6} lg={3} key={delivery._id + delivery.name}>
                  <DeliveryCard actualPage={actualPage} onOpenEdit={onOpenEdit} reload={reload} deliverable={delivery} />
                  <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} />
                </Grid>
              );
            })
            :
            <Grid item xs={12} sm={12}>
              <Typography align='center' variant='subtitle1' p={5}>No hay entregas disponibles</Typography>
            </Grid>
        }
      </Grid>
      <FloatButton
        onAction={onOpenCreate}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddDeliveryDialog onClose={onCloseCreate} open={openCreate} />
      <EditDeliverableDialog onClose={onCloseEdit} open={openEdit} />
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
      destination: '/',
      permanent: false,
    },
  };
};