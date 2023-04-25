import { GetServerSideProps } from 'next';
import { isValidToken } from '../../../../../src/helpers/isValidToken';
import { TasksPage } from '../../../../../src/components/Tasks/TaskPage';

export default function Page (): JSX.Element {
  return (
    <TasksPage>
      <TasksPage.PaginationHero />
      <TasksPage.Grid />
      <TasksPage.FloatButton />
      <TasksPage.AddForm />
      <TasksPage.EditForm />
      <TasksPage.TimerClock />
    </TasksPage>
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
