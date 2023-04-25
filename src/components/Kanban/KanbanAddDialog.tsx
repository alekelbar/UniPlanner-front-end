import { KanbanAdd } from '../../../src/components/Kanban/KanbanForm';
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
    <KanbanAdd onClose={onClose} open={OpenAdd} />
  );
};