import EditTaskDialog from '../../../src/components/Tasks/EditTaskDialog';
import { useContext } from 'react';
import { taskPageContext } from './context/TaskPageContext';


export const TaskEditForm = () => {

  const {
    dialogHandler: {
      onCloseEdit, openEdit
    }
  } = useContext(taskPageContext);
  return (
    <EditTaskDialog onClose={onCloseEdit} open={openEdit} />
  );
};