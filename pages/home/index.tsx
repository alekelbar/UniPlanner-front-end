import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { UserCredentials } from '../../src/services/API/User/users.models';
import { GetServerSideProps } from 'next';
import Copyright from '../../src/components/Copyright';

interface Props {
  parseToken: UserCredentials;
}

const Career: React.FC<Props> = () => {
  return (
    <Container maxWidth="lg">
      <Typography>Hola mundo!</Typography>
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