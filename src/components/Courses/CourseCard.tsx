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
import { MIN_CARD_HEIGHT } from '../../config/sizes';

interface CourseCardProps {
  course: Course;
  onOpenEdit: () => void;
  reload: (page: number) => void;
  actualPage: number;
}

export default function CourseCard ({ course, onOpenEdit, reload, actualPage }: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    const response = await dispatch(startRemoveCourse(course));
    if (response !== RESPONSES.SUCCESS) {
      let responseText = "";
      switch (response) {
        case RESPONSES.UNAUTHORIZE:
          responseText = "Parece que no tiene autorización para estar aquí 🔒";
          router.push("/");
          dispatch(onLogOut());
          logOut();
          return;
        case RESPONSES.BAD_REQUEST:
          responseText = 'Parece que todavía tienes algunas entregas 🔒';
      }
      await Swal.fire({
        title: "Una disculpa",
        text: responseText,
        icon: 'info'
      });
    }
    reload(actualPage);
  };

  return (
    <Card variant='elevation'
      sx={{
        minHeight: MIN_CARD_HEIGHT,
      }}
    >
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
          fullWidth variant='outlined'
          color='secondary'
          onClick={() => {
            dispatch(setSelectedCourse(course));
            router.push('/home/deliveries');
          }}
        >Ver entregables
        </Button>
        <CardActions>
          <Button
            variant='outlined'
            color='error'
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
