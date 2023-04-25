import AddTaskDialog from '../../../src/components/Tasks/AddTaskDialog';
import { useContext } from 'react';
import { taskPageContext } from './context/TaskPageContext';

export const TaskAddForm = () => {
  const {
    dialogHandler: {
      onCloseCreate, openCreate
    }
  } = useContext(taskPageContext);

  return (
    <AddTaskDialog onClose={onCloseCreate} open={openCreate} />
  );
};