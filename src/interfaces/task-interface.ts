export enum TASK_STATUS {
  COMPLETED = "Completa",
  IMCOMPLETED = "Incompleta",
}

export interface CreateTask {
  name: string;
  descripcion: string;
  status: string;
  delivery?: string;
}

export interface UpdateTask {
  name: string;
  descripcion: string;
  status: string;
  delivery?: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selected: Task;
  count: number;
}

export interface Task {
  _id?: string;
  delivery?: string;
  name: string;
  descripcion: string;
  status: string;
}
