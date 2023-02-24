import { RESPONSES } from '../../interfaces/response-messages';
import { AppDispatch, RootState } from '../store';


export const startLoadCareers = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando las carreras...
    const {
      auth: { user },
    } = getState();

    if (!user) {
      return RESPONSES.UNAUTHORIZE;
    }

    
  };
};
