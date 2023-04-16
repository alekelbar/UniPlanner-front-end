import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { logOut } from '../../helpers/local-storage';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startUpdateCourse } from '../../redux/thunks/courses.thunks';

interface EditCourseDialogProps {
  open: boolean,
  onClose: () => void,
}

export function EditCourseDialog ({ onClose, open }: EditCourseDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selected } = useAppSelector(st => st.courses);

  const [selectedCourse, setSelectedCourse] = useState(selected);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues: {
      name: "",
      courseDescription: "",
      credits: 0,
    },
    onSubmit: async (values) => {
      const { courseDescription, credits, name } = values;
      const response = await dispatch(startUpdateCourse(name, courseDescription, credits));

      if (response !== RESPONSES.SUCCESS) {
        let responseText = "";

        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            responseText = "Parece que no tiene autorización para estar aquí 🔒";
            router.push("/");
            dispatch(onLogOut);
            logOut();
            onClose();
            return;
          case RESPONSES.BAD_REQUEST:
            responseText = 'Parece que hubo un inconveniente con el servidor 🔒';
        }
        await Swal.fire({
          title: "Una disculpa",
          text: responseText,
          icon: 'info'
        });
      }
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(5, "Trata de utilizar al menos 5 caracteres")
        .required(),
      courseDescription: Yup
        .string()
        .min(10, "Trata de utilizar al menos 10 caracteres")
        .required(),
      credits: Yup.number()
        .positive("debe ser un numero positivo")
        .required('Porfavor, agrega los creditos que vale este curso'),
    }),
  });

  useEffect(() => {
    setSelectedCourse(selected);
    formik.setFieldValue('courseDescription', selected?.courseDescription);
    formik.setFieldValue('name', selected?.name);
    formik.setFieldValue('credits', selected?.credits);
  }, [selected]);
  

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
        <DialogTitle>
          Actualizar curso
        </DialogTitle>
        <DialogContent>
          {
            !selectedCourse
              ? <Typography>Parece que no se encuentra ningún curso seleccionado</Typography>
              : (
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
                    <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
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
                    <Typography variant='caption' color={'error'}>{formik.errors.courseDescription}</Typography>
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
                    <Typography variant='caption' color={'error'}>{formik.errors.credits}</Typography>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary">
                    Actualizar
                  </Button>
                </Stack>
              )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}

