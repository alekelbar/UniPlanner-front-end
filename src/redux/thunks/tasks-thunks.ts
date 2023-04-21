import { RESPONSES } from "../../interfaces/response-messages";
import { CreateTask, Task } from "../../interfaces/task-interface";
import { TaskService } from "../../services/Task/task-service";
import {
  addTask,
  loadTask,
  removeTask,
  startLoadingTask,
  stopLoadingTask,
  updateTask,
} from "../slices/Tasks/task-slice";
import { AppDispatch, RootState } from "../store";

export const startLoadTasks = (deliveryId: string, page: number) => {
  return async (dispatch: AppDispatch) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const service = new TaskService();
    const response = await service.getTasks(deliveryId, page);

    if (response.status !== 200) {
      dispatch(stopLoadingTask());
      return response;
    }

    const { data } = response;
    dispatch(loadTask(data));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startCreateTask = (createTask: CreateTask) => {
  return async (dispatch: AppDispatch) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const service = new TaskService();
    const response = await service.createTask(createTask);

    console.log(response);

    if (response.status !== 201) {
      dispatch(stopLoadingTask());
      return response;
    }

    const { data } = response;
    dispatch(addTask(data));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveTask = (remove: Task) => {
  return async (dispatch: AppDispatch) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const service = new TaskService();
    const response = await service.removeTask(remove);

    if (response.status !== 200) {
      dispatch(stopLoadingTask());
      return response;
    }

    const { data } = response;
    dispatch(removeTask(remove));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateTask = (update: Task) => {
  return async (dispatch: AppDispatch) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const service = new TaskService();
    const response = await service.updateTask(update);

    if (response.status !== 200) {
      dispatch(stopLoadingTask());
      return response;
    }

    const { data } = response;
    dispatch(updateTask(update));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};
