import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AddCareerDialog } from '../../src/components/Career/AddCareerDialog';
import { CareerCard } from '../../src/components/Career/CareerCard';
import { Loading } from '../../src/components/common/Loading';
import { logOut } from '../../src/helpers/local-storage';
import { Career } from '../../src/interfaces/career.interface';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { onLogOut } from '../../src/redux/slices/auth/authSlice';
import { startLoadCareers } from '../../src/redux/thunks/careers-thunks';
import { CareerService } from '../../src/services/Career/career-service';
import { FloatButton } from '../../src/components/common/FloatButton';
import { Add } from '@mui/icons-material';
import { validateToken } from '../../src/services/auth/validate-token';
import { API_VERSION } from '../../src/types';

interface Props {
  parseToken: UserState;
  allCareers: Career[];
}

const Career: React.FC<Props> = ({ allCareers }) => {

  const dispatch = useAppDispatch();

  const careerState = useAppSelector(st => st.career);
  const { careers, loading } = careerState;

  const [careersState, setCareersState] = useState<Career[]>(careers);

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await dispatch(startLoadCareers());
      if (response == RESPONSES.UNAUTHORIZE) {
        dispatch(onLogOut());
        logOut();
        router.push('/auth');
      }
    })();
  }, []);

  useEffect(() => {
    setCareersState(careers);
  }, [careers]);

  if (loading) {
    return (
      <Loading />
    );
  }


  return (
    <Container maxWidth="lg">
      <Grid container my={2} spacing={5} justifyContent='space-evenly'>
        {
          careersState.map(career => (
            <Grid item xs={12} md={6} key={career._id}>
              <CareerCard career={career} />
            </Grid>
          ))
        }
      </Grid >
      <FloatButton
        onAction={onOpen}
        icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
      <AddCareerDialog
        onClose={onClose}
        open={open} careers={
          allCareers.filter((e) => {
            return !!!careers.find((c) => c._id === e._id);
          })
        } />
    </Container>
  );
};

export default Career;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { token } = ctx.req.cookies;

  if (token) {
    const parseToken: UserState = JSON.parse(token);
    const tokenString = parseToken.token;


    if ((await validateToken(tokenString))) {
      const service = CareerService.createService(API_VERSION);
      const response = await service.listAll();

      if (typeof response === "string") {
        return {
          redirect: {
            destination: '/auth',
            permanent: false,
          },
        };
      }

      return {
        props: {
          allCareers: response.data
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