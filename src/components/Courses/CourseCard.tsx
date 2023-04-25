import { Card, CardActions, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { MIN_CARD_HEIGHT } from '../../config/sizes';
import { logOut } from '../../helpers/local-storage';
import { Course } from '../../interfaces/course.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedCourse } from '../../redux/slices/Courses/coursesSlice';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startRemoveCourse } from '../../redux/thunks/courses.thunks';

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
  const { query: { userId } } = router;

  const handleDelete = async () => {
    const response = await dispatch(startRemoveCourse(course));
    if (response !== RESPONSES.SUCCESS) {
      Swal.fire(response);
    }
    reload(actualPage);
  };

  return (
    <Card variant='elevation' data-testid="course-card"
      sx={{
        minHeight: MIN_CARD_HEIGHT,
      }}
    >
      <CardHeader
        title={name}
        titleTypographyProps={{
          variant: 'h6'
        }}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
        subheader={
          <Typography variant="h6" sx={{
            color: (theme) => theme.palette.info.main,
          }} gutterBottom>
            Creditos: {credits}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {courseDescription}
        </Typography>
        <Button
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(.9)',
            },
          }}
          fullWidth variant='contained'
          color='secondary'
          onClick={() => {
            dispatch(setSelectedCourse(course));
            router.push(`/schedule/deliveries/${course._id}/${course.name}/${userId}`);
          }}
        >VER ENTREGABLES
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
            onClick={() => { dispatch(setSelectedCourse(course)); onOpenEdit(); }}>
            Actualizar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
