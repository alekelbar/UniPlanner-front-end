import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AddCareerDialog } from '../../src/components/Career/AddCareerDialog';
import { CareerCard } from '../../src/components/Career/CareerCard';
import { Loading } from '../../src/components/common/Loading';
import { logOut } from '../../src/helpers/local-storage';
import { Career as CareerPage } from '../../src/interfaces/career.interface';
import { RESPONSES } from '../../src/interfaces/response-messages';
import { UserState } from '../../src/interfaces/users.interface';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';
import { onLogOut } from '../../src/redux/slices/auth/authSlice';
import { startLoadCareers } from '../../src/redux/thunks/careers-thunks';
import { FloatButton } from '../../src/components/common/FloatButton';
import { Add } from '@mui/icons-material';
import { useAllCareers } from '../../src/hooks/Carrers/useAllCarrers';
import { isValidToken } from '../../src/helpers/isValidToken';

interface Props {
  parseToken: UserState;
  allCareers: CareerPage[];
}

const CareerPage: React.FC<Props> = () => {

  const { allCareers, loading: allCarrersLoading } = useAllCareers();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { careers, loading } = useAppSelector(st => st.career);

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const response = await dispatch(startLoadCareers());
      if (response == RESPONSES.UNAUTHORIZE) {
        dispatch(onLogOut());
        logOut();
        router.push('/');
      }
    })();
  }, []);


  if (loading) {
    return (
      <Loading />
    );
  }

  if (allCarrersLoading) return <Loading />;

  return (
    <Container maxWidth="lg">
      <Grid container my={2} spacing={5} justifyContent='space-evenly'>
        {
          careers.map(career => (
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

export default CareerPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};