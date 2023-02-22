import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UserState } from '../../src/interfaces/users.interface';
import { GetServerSideProps } from 'next';

interface Props {
  parseToken: UserState;
}

const Profile: React.FC<Props> = () => {
  return (
    <Container maxWidth="lg">
      <Typography>Hola Profile!</Typography>
    </Container>
  );
};

export default Profile;

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

  if (Object.keys(parseToken).length < 3) {
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