import { Add } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { GetServerSideProps } from 'next';
import React from 'react';
import { AddCareerDialog } from '../../../src/components/Career/AddCareerDialog';
import { CareerCard } from '../../../src/components/Career/CareerCard';
import { FloatButton } from '../../../src/components/common/FloatButton';
import { Loading } from '../../../src/components/common/Loading';
import { getUniqueCareeers } from '../../../src/helpers/getUniqueCareers';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { useAllCareers } from '../../../src/hooks/Carrers/useAllCarrers';
import { useCareerPage } from '../../../src/hooks/Carrers/useCareerPage';

interface Props {
}

const CareerPage: React.FC<Props> = () => {

  const { careers, loading, onClose, onOpen, open } = useCareerPage();

  const { allCareers, loading: allCarrersLoading } = useAllCareers([careers]);

  if (loading || allCarrersLoading) {
    return (
      <Loading called='careers/id' />
    );
  }

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
        sxProps={{ position: 'fixed', bottom: 16, right: 16 }}
      />

      <AddCareerDialog
        onClose={onClose}
        open={open} careers={getUniqueCareeers(allCareers, careers)} />
    </Container>
  );
};

export default CareerPage;

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