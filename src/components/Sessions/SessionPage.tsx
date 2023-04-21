import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Loading } from '../../../src/components';
import { SessionTimer } from '../../../src/components/Sessions/Clock/Timer';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { useSession } from '../../../src/components/Sessions/hooks/useSession';
import { ReactElement, createContext } from 'react';
import { SessionContext } from './interfaces/SessionContext';
import { SessionAddDialog } from './SessionAddDialog';
import { SessionPagination } from './SessionPagination';
import { SessionGrid } from './SessionGrid';
import { SessionAddButton } from './SessionAddButton';


// * CONTEXTO 
export const sessionPageContext = createContext({} as SessionContext);
const { Provider } = sessionPageContext;


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