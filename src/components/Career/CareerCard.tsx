import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Career } from '../../interfaces/career.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelectedCareer } from '../../redux/slices/Career/careerSlice';
import { startRemoveCareer } from '../../redux/thunks/careers-thunks';

interface CareerCardProps {
  career: Career;
}

export function CareerCard ({ career }: CareerCardProps): JSX.Element {
  const { name, _id } = career;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveCareer(_id));
    if (response !== RESPONSES.SUCCESS) {
      let responseText = "";
      switch (response) {
        case RESPONSES.UNAUTHORIZE:
          responseText = "Parece que no tiene autorización para estar aquí 🔒";
          router.push("/");
          dispatch(onLogOut);
          logOut();
          return;
        case RESPONSES.BAD_REQUEST:
          responseText = 'Parece que hubo un inconveniente con el servidor 🔒';
          return;
      }
      await Swal.fire({
        title: "Una disculpa",
        text: responseText,
        icon: 'info'
      });
    }
    return;
  };

  const handleSelectedCareer = () => {
    dispatch(setSelectedCareer(career));
    router.push('/home/courses');
  };

  return (
    <Card variant='elevation'>
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
}