import Container from '@mui/material/Container';
import React, { ReactElement } from 'react';
import { Loading } from '../../../src/components/common/Loading';
import { CareerProvider } from './context/careerContext';
import { CareerGrid } from './CareerGrid';
import { CareerFloatButton } from './CareerFloatButton';
import { CareerAddForm } from './CareerAddForm';
import { useCareerPage } from './hooks/useCareerPage';


export const CareerPage = ({ children }: { children: ReactElement | ReactElement[]; }) => {

  const context = useCareerPage();

  if (context.dialog.loading || context.state.allCarrersLoading) {
    return (
      <Loading called='careers/id' />
    );
  }
  return (
    <CareerProvider value={context}>
      <Container maxWidth="lg">
        {children}
      </Container>
    </CareerProvider>
  );
};

CareerPage.Grid = CareerGrid;
CareerPage.FloatButton = CareerFloatButton;
CareerPage.AddForm = CareerAddForm;



