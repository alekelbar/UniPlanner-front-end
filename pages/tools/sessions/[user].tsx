import { GetServerSideProps } from 'next';
import { isValidToken } from '../../../src/helpers/isValidToken';
import SessionsPage from '../../../src/components/Sessions/SessionPage';



export default function Page (): JSX.Element {
  return (
    <SessionsPage>
      <SessionsPage.Pagination />
      <SessionsPage.Grid />
      <SessionsPage.AddButton />
      <SessionsPage.AddDialog />
      <SessionsPage.Timer />
    </SessionsPage>
  );
}

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