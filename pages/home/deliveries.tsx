import { Add } from '@mui/icons-material';
import { Box, Divider, Grid, Pagination, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Loading } from '../../src/components';
import AddDeliveryDialog from '../../src/components/Deliverables/AddDeliveryDialog';
import { DeliveryCard } from '../../src/components/Deliverables/DeliveryCard';
import EditDeliverableDialog from '../../src/components/Deliverables/EditDeliverableDialog';
import { FloatButton } from '../../src/components/common/FloatButton';
import isInteger from '../../src/helpers/isInteger';
import { isValidToken } from '../../src/helpers/isValidToken';
import usePagination from '../../src/hooks/pagination';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../src/redux';
import { startLoadDeliveries } from '../../src/redux/thunks/deliverables-thunks';
import NotFound from '../404';

interface DeliveriesProps {

}

export default function DeliveriesPage ({ }: DeliveriesProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { selected: selectedCourse } = useAppSelector(st => st.courses);
  const { deliverables, count, loading } = useAppSelector(st => st.deliveries);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

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
        await Swal.fire(response);
      }
    }
  };

  useEffect(() => {
    reload(actualPage);
  }, [actualPage]);

  useEffect(() => {
    if (deliverables.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (deliverables.length > 5) {
      reload(actualPage);
    }

    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [deliverables]);


  if (!selectedCourse) return <NotFound />;
  if (loading) return <Loading called='deliveries' />;

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
          deliverables.length
            ? deliverables.map((delivery) => {
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