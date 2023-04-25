import { Grid, Typography } from '@mui/material';
import { DeliveryCard } from '../../../src/components/Deliverables/DeliveryCard';
import { priorityCalc } from '../Career/helpers/priorityCalc';
import { useContext } from 'react';
import { deliveryPageContext } from './context/DeliveryPageContext';


export const DeliveryGrid = () => {

  const {
    pagination: {
      actualPage,
    },
    deliveriesState: {
      deliverables,
      reload
    },
    dialogHandler: {
      onOpenEdit
    }
  } = useContext(deliveryPageContext);

  const sortedDeliveries = [...deliverables];

  sortedDeliveries.sort((a, b) => {
    return (priorityCalc[b.urgency] + priorityCalc[b.importance]) -
      (priorityCalc[a.urgency] + priorityCalc[a.importance]);
  });

  return (
    <Grid
      container
      gap={1}
      p={2}
      direction={'row'}
      justifyContent="space-around"
      alignItems={'center'}>
      {
        sortedDeliveries.length
          ? sortedDeliveries.map((delivery) => {
            return (
              <Grid item xs={12} sm={4} md={6} lg={3} key={delivery._id}>
                <DeliveryCard actualPage={actualPage} onOpenEdit={onOpenEdit} reload={reload} deliverable={delivery} />
                {/* <Divider variant='fullWidth' sx={{ display: { md: 'none' } }} /> */}
              </Grid>
            );
          })
          :
          <Grid item xs={12} sm={12}>
            <Typography align='center' variant='subtitle1' p={5}>No hay entregas disponibles</Typography>
          </Grid>
      }
    </Grid>
  );
};