import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { UserCredentials } from '../../src/services/API/User/users.models';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks.redux';
import { startLoadCareers } from '../../src/redux/thunks/user.thunks';
import { useState } from 'react';
import { Career } from '../../src/services/API/Career/career.models';
import { Backdrop, CircularProgress, Grid, SpeedDial, SpeedDialAction } from '@mui/material';
import { CareerCard } from '../../src/components/Career/CareerCard';
import { Box } from '@mui/system';
import { Add, Edit } from '@mui/icons-material';

interface Props {
  parseToken: UserCredentials;
}

const Career: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const { careers, loading } = useAppSelector(st => st.career);
  const [careersState, setCareersState] = useState<Career[]>(careers);


  useEffect(() => {
    dispatch(startLoadCareers());
  }, []);

  useEffect(() => {
    setCareersState(careers);
  }, [careers]);

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container mt={2}>
        {
          careersState.map(career => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={career._id}>
              <CareerCard title={career.name} />
            </Grid>
          ))
        }
      </Grid >
      <AddCareerButton />
    </Container>
  );
};

export default Career;

const AddCareerButton: React.FC = () => (
  <Box>
    <SpeedDial
      ariaLabel="Agregar carrera"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<Edit />}
    >
      <SpeedDialAction
        icon={<Add />}
        tooltipTitle={'Agregar una carrera'}
      />
    </SpeedDial>
  </Box>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const parseToken = JSON.parse(token);

  if (Object.keys(parseToken).length < 3 || parseToken.token === null) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      parseToken,
    }
  };
};