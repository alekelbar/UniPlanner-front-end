import { RESPONSES } from "../../interfaces/response-messages";
import { CreateTask, Task, UpdateTask } from "../../interfaces/task-interface";
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

export const startLoadTasks = (page: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const {
      auth: { user },
      deliveries: { selected: selectedDelivery },
    } = getState();

    if (!user || !selectedDelivery) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = TaskService.createService();
    const response = await service.getTasks(selectedDelivery, page);

    if (typeof response === "string") {
      dispatch(stopLoadingTask());
      return response;
    }

    const data = response.data;
    dispatch(loadTask(data));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startCreateTask = (createTask: CreateTask) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const {
      auth: { user },
      deliveries: { selected: selectedDelivery },
    } = getState();

    if (!user || !selectedDelivery) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = TaskService.createService();
    createTask.delivery = selectedDelivery._id;

    const response = await service.createTask(createTask);

    if (typeof response === "string") {
      dispatch(stopLoadingTask());
      return response;
    }

    const data = response.data;
    dispatch(addTask(data));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveTask = (remove: Task) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = TaskService.createService();
    const response = await service.removeTask(remove);

    if (typeof response === "string") {
      dispatch(stopLoadingTask());
      return response;
    }

    const data = response.data;
    dispatch(removeTask(remove));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateTask = (update: Task) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LAS TAREAS...
    dispatch(startLoadingTask());

    const {
      auth: { user },
      deliveries: { selected: selectedDelivery },
    } = getState();

    if (!user || !selectedDelivery) {
      return RESPONSES.UNAUTHORIZE;
    }

    const service = TaskService.createService();
    const response = await service.updateTask(update);

    if (typeof response === "string") {
      dispatch(stopLoadingTask());
      return response;
    }

    const data = response.data;
    dispatch(updateTask(update));
    dispatch(stopLoadingTask());
    return RESPONSES.SUCCESS;
  };
};
