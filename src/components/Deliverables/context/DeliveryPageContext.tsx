import { ChangeEvent, createContext } from 'react';
import { Deliverable } from '../../../interfaces/deliveries.interface';


export interface DeliveryPageContext {
  deliveriesState: {
    deliverables: Deliverable[],
    loading: boolean,
    reload: (page?: number) => Promise<void>;
  },
  pagination: {
    actualPage: number;
    handleChangePage: (event: ChangeEvent<unknown>, page: number) => void;
    totalPages: number;
  },
  dialogHandler: {
    openCreate: boolean;
    openEdit: boolean;
    onCloseCreate: () => void;
    onOpenCreate: () => void;
    onCloseEdit: () => void;
    onOpenEdit: () => void;
  };
}

export const deliveryPageContext = createContext({} as DeliveryPageContext);
export const { Provider: DeliveryProvider } = deliveryPageContext;