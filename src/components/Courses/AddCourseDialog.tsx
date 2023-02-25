import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

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

  const formik = useFormik({
    initialValues: {
      name: "",
      courseDescription: "",
      credits: 4,
    },
    onSubmit: async (values) => {
      console.log(values);
      const { courseDescription, credits, name } = values;
      const response = await dispatch(startAddCourse(name, courseDescription, credits));
      if (response !== RESPONSES.SUCCESS) {
        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            await Swal.fire('Parece que no tiene autorización para estar aquí 🔒');
            router.push("/auth");
            onClose();
            return;
          case RESPONSES.BAD_REQUEST:
            await Swal.fire('Parece que este cursos ya existe 🔒');
            return;
        }
      }
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(10, "Trata de utilizar al menos 10 caracteres")
        .required("Oye, oye, necesitamos el nombre del curso"),
      courseDescription: Yup
        .string()
        .min(10, "Trata de utilizar al menos 10 caracteres")
        .required("Oye, oye, necesitamos la descripción del curso"),
      credits: Yup.number()
        .positive("debe ser un numero positivo")
        .required('Porfavor, agrega los creditos que vale este curso'),
    }),
  });

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}>
        <DialogTitle>
          <Typography
            component={'p'}
            variant='subtitle1'
            align='center'>
            Llevas un nuevo curso? 😆
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack
            component={'form'}
            onSubmit={formik.handleSubmit}
            direction="column"
            justifyContent={'center'}
            alignItems={'center'}
            spacing={2}>
            <TextField
              value={formik.values.name}
              name={'name'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese el nombre del curso"
              placeholder='Nombre' />
            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
            )}
            <TextField
              value={formik.values.courseDescription}
              name={'courseDescription'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Ingrese la descripción del curso"
              placeholder='Descripción' />
            {formik.touched.courseDescription && formik.errors.courseDescription && (
              <Typography variant='caption' color={'error'}>{formik.errors.courseDescription}</Typography>
            )}
            <TextField
              value={formik.values.credits}
              name={'credits'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText="Agregue el valor en creditos del curso"
              placeholder='Credito' />
            {formik.touched.credits && formik.errors.credits && (
              <Typography variant='caption' color={'error'}>{formik.errors.credits}</Typography>
            )}
            <Button
              onClick={() => console.log('agregando curso...')}
              type="submit"
              variant="contained"
              color="secondary">
              Agregar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

