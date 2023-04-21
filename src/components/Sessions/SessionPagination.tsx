import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useContext } from 'react';
import { sessionPageContext } from './SessionPage';

export const SessionPagination = () => {

  const {
    pagination: {
      actualPage,
      handleChangePage,
      totalPages
    },
    theming: {
      theme
    }
  } = useContext(sessionPageContext);

  return (
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
  );
};