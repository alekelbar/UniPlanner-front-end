import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { isValidToken } from '../../../../../src/helpers/isValidToken';
import CoursesPage from '../../../../../src/components/Courses/CoursePage';

export default function Page () {

  return (
    <Stack direction="column" sx={{ borderRadius: '.8em' }}>
      <CoursesPage>
        <CoursesPage.HeroPagination />
        <CoursesPage.Grid />
        <CoursesPage.AddButton />
        <CoursesPage.AddForm />
        <CoursesPage.EditForm />
      </CoursesPage>
    </Stack>
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