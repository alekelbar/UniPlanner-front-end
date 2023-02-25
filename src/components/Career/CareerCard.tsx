import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Career } from '../../interfaces/career.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedCareer } from '../../redux/slices/Career/careerSlice';
import { startRemoveCareer } from '../../redux/thunks/user.thunks';

interface CareerCardProps {
  career: Career;
}

export function CareerCard ({ career }: CareerCardProps): JSX.Element {
  const { name, _id } = career;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveCareer(_id));
    switch (response) {
      case RESPONSES.UNAUTHORIZE:
        router.replace('auth');
        return;
      default:
        await Swal.fire('Desactivación', 'La carrera fue inhabilitada');
        return;
    }
  };

  const handleSelectedCareer = () => {
    dispatch(setSelectedCareer(career));
    router.push('/home/courses');
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleSelectedCareer}
        > Ver cursos
        </Button>
        <Button
          variant='text'
          color='warning'
          onClick={handleRemove}
        > inhabilitar
        </Button>
      </CardActions>
    </Card>
  );
}