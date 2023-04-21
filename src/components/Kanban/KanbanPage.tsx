import { Container } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { Loading } from '../../../src/components';
import { useKanbanBoard } from '../../../src/components/Kanban/hooks/useKanbanBoard';
import { ReactElement } from 'react';
import { KanbanLists } from './KanbanLists';
import { KanbanAddButton } from './KanbanAddButton';
import { KanbanAdd } from './KanbanAddDialog';
import { Provider } from './context/kanbanContext';

// model ...
// * CONTEXT:
export const KanbanPage = ({ children }: { children: ReactElement | ReactElement[]; }) => {

  const context = useKanbanBoard();

  if (context.data.loading) return <Loading called='kanban' />;

  return (
    <Provider value={context}>
      <Container sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        overflow: 'auto',
        maxHeight: '70vh',
      }}>
        <DragDropContext onDragEnd={context.handlers.handleOnDragEnd}>
          {children}
        </DragDropContext>
      </Container>
    </Provider>
  );
};

KanbanPage.lists = KanbanLists;
KanbanPage.AddButton = KanbanAddButton;
KanbanPage.AddDialog = KanbanAdd;