import { useEffect, useState } from 'react';
import { Career } from '../../interfaces/career.interface';
import { CareerService } from '../../services';

const initialState = {
  allCareers: [] as Career[],
  error: null,
  loading: true
};

export const useAllCareers = (dependencies: any = []) => {

  const [careersState, setCareersState] = useState(initialState);

  const getAllCareers = async () => {
    const service = new CareerService();
    const response = await service.listAll();

    if (response.status === 200) {
      return setCareersState({
        allCareers: response.data,
        error: null,
        loading: false
      });
    }
    setCareersState({ ...initialState, error: response });
  };

  useEffect(() => {
    getAllCareers();
  }, dependencies);

  const { allCareers, error, loading } = careersState;

  return {
    allCareers,
    error,
    loading
  };

};
