import { useEffect, useState } from 'react';
import { Career } from '../../interfaces/career.interface';
import { CareerService } from '../../services';



export const useAllCareers = () => {

  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const getAllCareers = async () => {
    const service = new CareerService();
    const response = await service.listAll();

    if (typeof response !== "string") {
      setAllCareers(response.data);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(false);
    setError(response);
  };

  useEffect(() => {
    getAllCareers();
  }, []);

  return {
    allCareers,
    error,
    loading
  };

};
