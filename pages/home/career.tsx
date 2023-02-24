import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AddCareerButton } from '../../src/components/Career/AddCareerButton';
import { AddCareerDialog } from '../../src/components/Career/AddCareerDialog';
import { CareerCard } from '../../src/components/Career/CareerCard';
import { Loading } from '../../src/components/common/Loading';
import { logOut } from '../../src/helpers/local-storage';
import { Career } from '../../src/interfaces/career.interface';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { onLogOut } from '../../src/redux/slices/auth/authSlice';
import { startLoadCareers } from '../../src/redux/thunks/user.thunks';
import { CareerService } from '../../src/services/Career/career.service';

interface Props {
  parseToken: UserState;
  allCareers: Career[];
}

const Career: React.FC<Props> = ({ allCareers }) => {

  const dispatch = useAppDispatch();

  const { careers, loading } = useAppSelector(st => st.career);
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
      <Grid container my={2} spacing={5}>
        {
          careersState.map(career => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={career._id}>
              <CareerCard id={career._id} title={career.name} />
            </Grid>
          ))
        }
      </Grid >
      <AddCareerButton onAdd={onOpen} />
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

  const service = CareerService.createService("v1");
  const { data: allCareers } = await service.listAll();

  return {
    props: {
      parseToken,
      allCareers
    }
  };
};