import { createContext } from "react";
import { SessionContext } from "../interfaces/SessionContext";

export const sessionPageContext = createContext({} as SessionContext);
export const { Provider } = sessionPageContext;
