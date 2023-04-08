import { persistor } from '../store';
import { Loading } from '../../components';
import { PersistGate } from 'redux-persist/lib/integration/react';

export function ReduxPersistWrapper (props: { children: React.ReactNode; }) {
  const { children } = props;

  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      {children}
    </PersistGate>
  );
}
