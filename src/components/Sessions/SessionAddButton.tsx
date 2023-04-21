import { Add } from '@mui/icons-material';
import { FloatButton } from '../../../src/components';
import { useContext } from 'react';
import { sessionPageContext } from './SessionPage';


export const SessionAddButton = () => {
  const {
    dialogHandler: {
      onOpenCreate,
    }
  } = useContext(sessionPageContext);

  return (
    <FloatButton
      onAction={onOpenCreate}
      icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
      sxProps={{ position: 'fixed', bottom: 16, right: 16 }} />
  );
};