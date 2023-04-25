import AddDeliveryDialog from '../../../src/components/Deliverables/AddDeliveryDialog';
import { useContext } from 'react';
import { deliveryPageContext } from './context/DeliveryPageContext';

export const DeliveryAddForm = () => {

  const {
    dialogHandler: {
      onCloseCreate,
      openCreate
    }
  } = useContext(deliveryPageContext);

  return (
    <AddDeliveryDialog onClose={onCloseCreate} open={openCreate} />
  );
};