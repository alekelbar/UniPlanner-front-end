import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { taskPageContext } from './context/TaskPageContext';


export const TaskPaginationHero = () => {
  const { query: { deliveryName } } = useRouter();
  const {
    pagination: {
      actualPage,
      totalPages,
      handleChangePage
    }
  } = useContext(taskPageContext);

  return (
    <Box position='sticky' top={0} sx={{
      backgroundColor: ({ palette }) => palette.primary.main,
      zIndex: '10'
    }}>
      <Typography
        mt={1}
        align='center'
        variant='subtitle1'>
        {`${deliveryName}`}
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