import { createContext } from "react";
import { Career } from "../../../interfaces/career.interface";

export interface CareerContext {
  dialog: {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    loading: boolean;
  };
  state: {
    careers: Career[];
    allCareers: Career[];
    allCarrersLoading: boolean;
  };
}

export const careerPageContext = createContext({} as CareerContext);
export const { Provider: CareerProvider } = careerPageContext;
