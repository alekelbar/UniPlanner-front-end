import { ChangeEvent, createContext } from "react";
import { Deliverable } from "../../../interfaces/deliveries.interface";
import { Task } from "../../../interfaces/task-interface";

interface TaskPageContext {
  tasksState: {
    tasks: Task[];
    reload: (page?: number) => Promise<void>;
    loading: boolean;
    selectedDelivery: Deliverable;
  },
  pagination: {
    actualPage: number;
    handleChangePage: (event: ChangeEvent<unknown>, page: number) => void;
    totalPages: number;
  },
  dialogHandler: {
    openClock: boolean;
    openCreate: boolean;
    openEdit: boolean;
    onCloseCreate: () => void;
    onCloseEdit: () => void;
    onOpenCreate: () => void;
    onOpenEdit: () => void;
    handleCloseClock: () => void;
    handleOpenClock: () => void;
  };
}


export const taskPageContext = createContext({} as TaskPageContext);
export const { Provider: TaskProvider } = taskPageContext;
