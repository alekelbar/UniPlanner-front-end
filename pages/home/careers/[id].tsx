import { Add } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AddCareerDialog } from '../../../src/components/Career/AddCareerDialog';
import { CareerCard } from '../../../src/components/Career/CareerCard';
import { FloatButton } from '../../../src/components/common/FloatButton';
import { Loading } from '../../../src/components/common/Loading';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { useAllCareers } from '../../../src/hooks/Carrers/useAllCarrers';
import { Career } from '../../../src/interfaces/career.interface';
import { RESPONSES } from '../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../src/redux/hooks';
import { startLoadCareers } from '../../../src/redux/thunks/careers-thunks';

interface Props {
}

function getUniqueCareeers (carr1: Career[], carr2: Career[]) {
  const mergeArr = [...carr1, ...carr2];

  return mergeArr.filter(e => {
    return !carr2.find(c => c._id === e._id);
  });
}

const CareerPage: React.FC<Props> = () => {
  const router = useRouter();
  const { query } = router;

  const dispatch = useAppDispatch();
  const { careers, loading } = useAppSelector(state => state.career);


  useEffect(() => {
    (async () => {
      const response = await dispatch(startLoadCareers(query.id as string));
      if (response !== RESPONSES.SUCCESS)
        await Swal.fire(response);
    })();
  }, [query.id]);


  const { allCareers, loading: allCarrersLoading } = useAllCareers([careers]);

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

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