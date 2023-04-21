import { KanbanBoard } from '../../../src/components/Kanban/KanbanForm';
import { useContext } from 'react';
import { kanbanContext } from "./context/kanbanContext";


export const KanbanAddDialog = () => {
  const {
    data: {
      OpenAdd,
    },
    handlers: {
      onClose
    }
  } = useContext(kanbanContext);

  return (
    <KanbanBoard onClose={onClose} open={OpenAdd} />
  );
};