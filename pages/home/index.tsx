import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UserCredentials } from '../../src/services/API/User/users.models';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks.redux';
import { startLoadCareers } from '../../src/redux/thunks/user.thunks';
import { useState } from 'react';
import { Career } from '../../src/services/API/Career/career.models';
import { Backdrop, CircularProgress } from '@mui/material';

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
      {
        careersState.map(career => (
          <Typography key={career._id} variant="h4">
            {career.name}
          </Typography>
        ))
      }
    </Container>
  );
};

export default Career;

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