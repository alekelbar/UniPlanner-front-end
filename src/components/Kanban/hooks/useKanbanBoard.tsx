import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { setStatus } from '../../../redux/slices/kanban/kanban-slice';
import { KanbanTaskModel } from '../../../redux/slices/kanban/models/taskModel';

type ListsState = {
  TODO: KanbanTaskModel[],
  DOING: KanbanTaskModel[],
  DONE: KanbanTaskModel[],
};

export const useKanbanBoard = () => {
  const { kanban: { tasks } } = useAppSelector(st => st);
  const dispatch = useAppDispatch();

  const loadTask = () => {
    // proceso asincrono para cargar las tareas...
    setLists({
      TODO: tasks.filter(task => task.status === "TODO"),
      DOING: tasks.filter(task => task.status === "DOING"),
      DONE: tasks.filter(task => task.status === "DONE")
    });
  };
  const [OpenAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
    setLoading(false);
  }, [tasks]);




  const onOpen = () => {
    setOpenAdd(true);
  };

  const onClose = () => {
    setOpenAdd(false);
  };

  const [lists, setLists] = useState<ListsState>({
    TODO: tasks.filter(task => task.status === "TODO"),
    DOING: tasks.filter(task => task.status === "DOING"),
    DONE: tasks.filter(task => task.status === "DONE")
  });

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // out of bounds
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Mismo tablero
      const newItems = [...lists[source.droppableId as keyof ListsState]];
      const [removed] = newItems.splice(source.index, 1);
      // TODO: Cambiarlo en la base de datos...
      newItems.splice(destination.index, 0, { ...removed, status: destination.droppableId });

      setLists({
        ...lists,
        [source.droppableId]: newItems
      });
    } else {
      // Diferente tablero
      const sourceItems = [...lists[source.droppableId as keyof ListsState]];
      let [removed] = sourceItems.splice(source.index, 1);
      // TODO: Cambiarlo en la base de datos...

      const destItems = [...lists[destination.droppableId as keyof ListsState]];
      destItems.splice(destination.index, 0, { ...removed, status: destination.droppableId });

      setLists({
        ...lists,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });

      dispatch(setStatus({ status: destination.droppableId, task: removed }));
    }
  };

  const [todo, doing, done] = Object.keys(lists);

  return {
    headers: {
      todo, doing, done
    },
    handlers: {
      handleOnDragEnd,
      onOpen,
      onClose,
    },
    data: {
      lists,
      OpenAdd,
      loading
    }

  };
};
