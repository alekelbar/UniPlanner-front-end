import { createContext } from "react";
import { KanbanContext } from "../interfaces";

export const kanbanContext = createContext({} as KanbanContext);
export const { Provider } = kanbanContext;
