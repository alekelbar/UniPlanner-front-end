import { Container } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { Loading } from '../../../src/components';
import { useKanbanBoard } from '../../../src/components/Kanban/hooks/useKanbanBoard';
import { ReactElement } from 'react';
import { KanbanLists } from './KanbanLists';
import { KanbanAddButton } from './KanbanAddButton';
import { KanbanAddDialog } from './KanbanAddDialog';
import { KanbanProvider } from './context/kanbanContext';

// model ...
// * CONTEXT:
export const KanbanPage = ({ children }: { children: ReactElement | ReactElement[]; }) => {

  const context = useKanbanBoard();

  if (context.data.loading) return <Loading called='kanban' />;

  return (
    <KanbanProvider value={context}>
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
    </KanbanProvider>
  );
};

KanbanPage.lists = KanbanLists;
KanbanPage.AddButton = KanbanAddButton;
KanbanPage.AddDialog = KanbanAddDialog;