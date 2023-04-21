import { BoardList } from '../../../src/components/Kanban/BoardList';
import { useContext } from 'react';

// model ...
import { kanbanContext } from "./context/kanbanContext";

export const KanbanLists = () => {
  const {
    data: {
      lists
    },
    headers: {
      doing,
      done,
      todo
    }
  } = useContext(kanbanContext);

  return (
    <>
      <BoardList header={'TO-DO 📝'} droppableId={todo} listOfItems={lists.TODO} />
      <BoardList header={'DOING ✏️'} droppableId={doing} listOfItems={lists.DOING} />
      <BoardList header={'DONE ✔️'} droppableId={done} listOfItems={lists.DONE} />
    </>
  );
};