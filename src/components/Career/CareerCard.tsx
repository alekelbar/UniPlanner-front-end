import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { startRemoveCareer } from '../../redux/thunks/user.thunks';

interface CareerCardProps {
  title: string;
  id: string;
}

export function CareerCard ({ title, id }: CareerCardProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveCareer(id));
    switch (response) {
      case RESPONSES.UNAUTHORIZE:
        router.replace('auth');
        return;
      default:
        await Swal.fire('Desactivación', 'La carrera fue inhabilitada');
        return;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='primary'
          onClick={() => console.log('ver cursos')}
        > Ver cursos
        </Button>
        <Button
          variant='text'
          color='primary'
          onClick={handleRemove}
        > inhabilitar
        </Button>
      </CardActions>
    </Card>
  );
}