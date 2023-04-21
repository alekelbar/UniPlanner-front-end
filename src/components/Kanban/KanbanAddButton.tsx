import { Add } from '@mui/icons-material';
import { FloatButton } from '../../../src/components';
import { useContext } from 'react';
import { kanbanContext } from "./context/kanbanContext";



export const KanbanAddButton = () => {
  const {
    handlers: {
      onOpen
    }
  } = useContext(kanbanContext);

  return (
    <FloatButton
      onAction={onOpen}
      icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
      sxProps={{ position: 'fixed', bottom: 16, right: 16 }}
    />
  );
};