import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { deliveryPageContext } from './context/DeliveryPageContext';


export const DeliveryPaginationHero = () => {

  const { query: { courseName } } = useRouter();
  const {
    pagination: {
      actualPage,
      totalPages,
      handleChangePage
    }
  } = useContext(deliveryPageContext);

  return (
    <Box component={'div'} position='sticky' top={0} sx={{
      backgroundColor: ({ palette }) => palette.primary.main,
      zIndex: '10'
    }}>
      <Typography
        mt={1}
        align='center'
        variant='subtitle1'>
        {`${courseName}`}
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
  );
};