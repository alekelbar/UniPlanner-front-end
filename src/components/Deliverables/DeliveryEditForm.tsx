import EditDeliverableDialog from '../../../src/components/Deliverables/EditDeliverableDialog';
import { useContext } from 'react';
import { deliveryPageContext } from './context/DeliveryPageContext';


export const DeliveryEditForm = () => {
  const {
    dialogHandler: {
      onCloseEdit,
      openEdit
    }
  } = useContext(deliveryPageContext);

  return (
    <EditDeliverableDialog onClose={onCloseEdit} open={openEdit} />
  );
};