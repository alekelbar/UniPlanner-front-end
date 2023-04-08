import { PersistGate } from 'redux-persist/lib/integration/react';
import { Loading } from '../../components';
import { persistor } from '../store';

export function ReduxPersistWrapper (props: { children: React.ReactNode; }) {
  const { children } = props;

  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      {children}
    </PersistGate>
  );
}
