import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { startAddCourse } from '../../redux/thunks/courses.thunks';

interface AddCourseDialogProps {
  open: boolean,
  onClose: () => void,
}


export function AddCourseDialog ({ onClose, open }: AddCourseDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query: { careerId, userId } } = router;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';


  const formik = useFormik({
    initialValues: {
      name: "",
      courseDescription: "",
      credits: 4,
    },
    onSubmit: async (values) => {
      const response = await dispatch(startAddCourse({
        ...values, career: careerId as string, user: userId as string
      }));

      if (response !== RESPONSES.SUCCESS)
        Swal.fire(response);

      formik.resetForm();
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(5, "Trata de utilizar al menos 5 caracteres")
        .required("Falta el nombre del curso"),
      courseDescription: Yup
        .string()
        .min(5, "Trata de utilizar al menos 5 caracteres")
        .required("Falta la descripción del curso"),
      credits: Yup.number()
        .positive("debe ser un numero positivo")
        .required('Porfavor, agrega los creditos que vale este curso'),
    }),
  });

  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            width: width,
            height: 'auto'
          }
        }}
        onClose={onClose}
        open={open}>
        <DialogTitle>Nuevo curso</DialogTitle>
        <DialogContent>
          <Stack
            component={'form'}
            onSubmit={formik.handleSubmit}
            direction="column"
            justifyContent={'center'}
            alignItems={'center'}
            spacing={2}>
            <TextField
              fullWidth
              value={formik.values.name}
              name={'name'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese el nombre del curso"
              placeholder='Nombre'
              autoComplete='off'
              rows={2}
              multiline
              type={"text"} />
            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.name}</Typography>
            )}
            <TextField
              fullWidth
              value={formik.values.courseDescription}
              name={'courseDescription'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese la descripción del curso"
              placeholder='Descripción'
              autoComplete='off'
              rows={2}
              multiline
              type={"text"} />
            {formik.touched.courseDescription && formik.errors.courseDescription && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.courseDescription}</Typography>
            )}
            <TextField
              fullWidth
              value={formik.values.credits}
              name={'credits'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Agregue el valor en creditos del curso"
              placeholder='Credito'
              autoComplete='off'
              rows={2}
              multiline
              type={"text"} />
            {formik.touched.credits && formik.errors.credits && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.credits}</Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary">
              Agregar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

