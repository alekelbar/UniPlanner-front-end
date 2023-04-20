import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Career } from '../../interfaces/career.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedCareer } from '../../redux/slices/Career/careerSlice';
import { startRemoveCareer } from '../../redux/thunks/careers-thunks';

interface CareerCardProps {
  career: Career;
}


export const CareerCard = function CareerCard ({ career }: CareerCardProps): JSX.Element {

  const { name, _id } = career;
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { query: { id } } = router;

  const handleRemove = async () => {
    const response = await dispatch(startRemoveCareer(id as string, _id));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
    return;
  };

  const handleSelectedCareer = () => {
    dispatch(setSelectedCareer(career));
    router.push('/home/courses');
  };

  return (
    <Card variant='elevation' data-testid="career-card">
      <CardHeader
        title={name}
      />
      <CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleSelectedCareer}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(.9)',
              },
            }}
          > Cursos
          </Button>
          <Button
            variant='outlined'
            color='warning'
            onClick={handleRemove}
          > inhabilitar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};