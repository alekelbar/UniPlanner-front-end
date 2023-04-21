import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { Loading, SessionTimer } from '../../../src/components';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { SessionAddButton } from './SessionAddButton';
import { SessionAddDialog } from './SessionAddDialog';
import { SessionGrid } from './SessionGrid';
import { SessionPagination } from './SessionPagination';
import { useSession } from '../../../src/components/Sessions/hooks/useSession';
import { Provider } from './context/SessionContext';


export default function SessionsPage ({ children }: { children: ReactElement | ReactElement[]; }): JSX.Element {

  const sessionContext = useSession();
  if (sessionContext.sessionState.loading) return (<Loading called='session/id' />);

  return (
    <Provider value={sessionContext}>
      <Stack direction="column" sx={{ borderRadius: '.8em' }}>
        {children}
      </Stack>
    </Provider>
  );
}

SessionsPage.Pagination = SessionPagination;
SessionsPage.Grid = SessionGrid;
SessionsPage.AddButton = SessionAddButton;
SessionsPage.AddDialog = SessionAddDialog;
SessionsPage.Timer = SessionTimer;

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