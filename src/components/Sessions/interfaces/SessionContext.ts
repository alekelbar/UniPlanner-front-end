import { Theme } from "@mui/material";
import { Session } from "../../../interfaces/session-interface";

export interface SessionContext {
  sessionState: {
    loading: boolean;
    selected: Session;
    sessions: Session[];
    reload: (page?: number) => Promise<void>;
  };
  clock: {
    openClock: boolean;
    onOpenClock: VoidFunction;
    onCloseClock: VoidFunction;
  };
  pagination: {
    handleChangePage: (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => void;
    totalPages: number;
    actualPage: number;
  };
  dialogHandler: {
    openCreate: boolean;
    onOpenCreate: VoidFunction;
    onCloseCreate: VoidFunction;
  };
  theming: {
    theme: Theme;
  };
}
