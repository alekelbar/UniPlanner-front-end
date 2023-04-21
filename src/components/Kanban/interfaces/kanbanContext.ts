import { DropResult } from "react-beautiful-dnd";
import { ListsState } from "../hooks/useKanbanBoard";

export interface KanbanContext {
  data: {
    OpenAdd: boolean;
    lists: ListsState;
    loading: boolean;
  };
  handlers: {
    handleOnDragEnd: (result: DropResult) => void;
    onClose: VoidFunction;
    onOpen: VoidFunction;
  };
  headers: {
    todo: string;
    doing: string;
    done: string;
  };
}
