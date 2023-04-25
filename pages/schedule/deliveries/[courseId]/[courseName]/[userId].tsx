import { GetServerSideProps } from 'next';
import { isValidToken } from '../../../../../src/helpers/isValidToken';
import { DeliveryPage } from '../../../../../src/components/Deliverables/DeliveryPage';


export default function Page (): JSX.Element {

  return (
    <DeliveryPage>
      <DeliveryPage.PaginationHero />
      <DeliveryPage.Grid />
      <DeliveryPage.FloatButton />
      <DeliveryPage.AddForm />
      <DeliveryPage.EditForm />
    </DeliveryPage>
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