import { useContext } from 'react';
import { AddCareerDialog } from '../../../src/components/Career/AddCareerDialog';
import { getUniqueCareeers } from './helpers/getUniqueCareers';
import { careerPageContext } from './context/careerContext';


export const CareerAddForm = () => {

  const { dialog: { onClose, open }, state: { allCareers, careers } } = useContext(careerPageContext);

  return (
    <AddCareerDialog
      onClose={onClose}
      open={open} careers={getUniqueCareeers(allCareers, careers)}
    />);
};