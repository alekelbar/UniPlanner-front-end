import { Card, CardActions, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { logOut } from '../../helpers/local-storage';
import { Course } from '../../interfaces/course.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { setSelected } from '../../redux/slices/Courses/coursesSlice';
import { startRemoveCourse } from '../../redux/thunks/courses.thunks';

interface CourseCardProps {
  course: Course;
  onOpenEdit: () => void;
}

export default function CourseCard ({ course, onOpenEdit }: CourseCardProps): JSX.Element {
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
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {courseDescription}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Credits: {credits}
        </Typography>
        <Button
          fullWidth variant='contained'
          color='secondary'
        >Ver entregables
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
            color='info'
            onClick={() => { onOpenEdit(); dispatch(setSelected(course)); }}>
            Actualizar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
