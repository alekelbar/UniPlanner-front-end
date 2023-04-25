import { Add } from '@mui/icons-material';
import { useContext } from 'react';
import { FloatButton } from '../../../src/components/common/FloatButton';
import { careerPageContext } from './context/careerContext';


export const CareerFloatButton = () => {

  const { dialog: { onOpen } } = useContext(careerPageContext);

  return (
    <FloatButton
      onAction={onOpen}
      icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
      sxProps={{ position: 'fixed', bottom: 16, right: 16 }}
    />

  );
};