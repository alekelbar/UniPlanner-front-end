import { Card, CardActions, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Course } from '../../interfaces/course.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelectedCourse } from '../../redux/slices/Courses/coursesSlice';
import { startRemoveCourse } from '../../redux/thunks/courses.thunks';

interface CourseCardProps {
  course: Course;
  onOpenEdit: () => void;
  reload: (page: number) => void;
}

export default function CourseCard ({ course, onOpenEdit, reload }: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    const deleted = await dispatch(startRemoveCourse(course));
    if (deleted !== RESPONSES.SUCCESS) {
      switch (deleted) {
        case RESPONSES.UNAUTHORIZE:
          await Swal.fire('Parece que no estas autorizado para ver esto 🔒');
          dispatch(onLogOut());
          logOut();
          router.push('/auth');
          break;
        case RESPONSES.BAD_REQUEST:
          await Swal.fire('Parece ser que este curso tiene todavía algunos entregables 😱');
          break;
      }
      return;
    }
    await Swal.fire('Listo, ese curso se marcho de nuestra vidas 🐶');
    reload(1);
  };

  return (
    <Card sx={{ maxWidth: 350 }} variant='elevation'>
      <CardHeader
        title={name}
        sx={{
          color: (theme) => theme.palette.primary.contrastText,
        }}
        subheader={
          <Tooltip title='Cantidad de creditos correspondientes a esta materia' placement='top-start'>
            <Typography variant="subtitle1" sx={{
              color: (theme) => theme.palette.info.main,
            }} gutterBottom>
              Credits: {credits}
            </Typography>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {courseDescription}
        </Typography>
        <Button
          fullWidth variant='contained'
          color='secondary'
          onClick={() => {
            dispatch(setSelectedCourse(course));
            router.push('/home/deliveries');
          }}
        >Entregables
        </Button>
        <CardActions>
          <Button
            variant='outlined'
            color='warning'
            onClick={handleDelete}>
            Eliminar
          </Button>
          <Button
            variant='outlined'
            color='success'
            onClick={() => { onOpenEdit(); dispatch(setSelectedCourse(course)); }}>
            Actualizar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
