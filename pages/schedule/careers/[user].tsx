import { GetServerSideProps } from 'next';
import React from 'react';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { CareerPage } from '../../../src/components/Career/CareerPage';

const Page: React.FC = () => {
  return (
    <CareerPage>
      <CareerPage.Grid />
      <CareerPage.FloatButton />
      <CareerPage.AddForm />
    </CareerPage>
  );
};

export default Page;

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