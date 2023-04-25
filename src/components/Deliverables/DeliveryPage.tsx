import { Stack } from '@mui/system';
import { Loading } from '../../../src/components';
import { useDeliveries } from '../../../src/components/Deliverables/hooks/useDeliveries';
import { ReactElement } from 'react';
import { DeliveryProvider } from './context/DeliveryPageContext';
import { DeliveryPaginationHero } from './DeliveryPaginationHero';
import { DeliveryGrid } from './DeliveryGrid';
import { DeliveryFloatButton } from './DeliveryFloatButton';
import { DeliveryAddForm } from './DeliveryAddForm';
import { DeliveryEditForm } from './DeliveryEditForm';

export function DeliveryPage ({ children }: { children: ReactElement | ReactElement[]; }): JSX.Element {
  const context = useDeliveries();

  const {
    deliveriesState: { loading },
  } = context;

  if (loading) return <Loading called='deliveries' />;

  return (
    <DeliveryProvider value={context}>
      <Stack direction="column" sx={{ borderRadius: '.8em' }}>
        {children}
      </Stack>
    </DeliveryProvider>
  );
}

DeliveryPage.PaginationHero = DeliveryPaginationHero;
DeliveryPage.Grid = DeliveryGrid;
DeliveryPage.FloatButton = DeliveryFloatButton;
DeliveryPage.AddForm = DeliveryAddForm;
DeliveryPage.EditForm = DeliveryEditForm;