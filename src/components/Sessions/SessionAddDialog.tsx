import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useAppDispatch } from '../../../src/redux';
import { useContext } from 'react';
import { CreateSession, SESSION_TYPES } from '../../../src/interfaces/session-interface';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { startcreateSession } from '../../redux/thunks/session-thunks';
import { useRouter } from 'next/router';
import { RESPONSES } from '../../interfaces/response-messages';
import Swal from 'sweetalert2';
import { sessionPageContext } from './context/SessionContext';

const initialValues: CreateSession = {
  duration: 1,
  name: "",
  type: SESSION_TYPES.WORKING,
};

export const SessionAddDialog = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    dialogHandler: {
      openCreate: open,
      onCloseCreate: onClose
    },
    theming: {
      theme
    }
  } = useContext(sessionPageContext);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { query } = router;
      const response = await dispatch(startcreateSession(query.user as string, {
        ...values
      }));

      if (response !== RESPONSES.SUCCESS)
        await Swal.fire(response);

      formik.resetForm();
      onClose();
    },
    validationSchema: Yup.object({
      duration: Yup
        .string()
        .test('is-number', 'La duración debe ser un número, y al menos 1 minuto', (value) => {
          if (isNaN(Number(value))) {
            return false;
          }
          return Number(value) >= 1;
        })
        .required("La duración de la sesión es requerida"),
      name: Yup
        .string()
        .min(5, "El nombre de una sesión debé al menos tener 5 caracteres")
        .required("El nombre de la sesión es requerido"),
      type: Yup
        .string()
        .required("El tipo de sesión es requerido"),
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
        <DialogTitle>
          Nueva sesión
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
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={'text'}
              onBlur={formik.handleBlur}
              autoComplete="off"
              rows={2}
              multiline
              placeholder="Nombre"
              helperText="¿Como va a nombrar a esta sesión?" />

            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
            )}

            <TextField
              fullWidth
              name="duration"
              onChange={formik.handleChange}
              value={formik.values.duration}
              type={'number'}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Descripción"
              helperText="¿Cuál es la duración en minutos?" />

            {formik.touched.duration && formik.errors.duration && (
              <Typography variant='caption' color={'error'}>{formik.errors.duration}</Typography>
            )}

            <Select
              fullWidth
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'type'}>
              <MenuItem value={SESSION_TYPES.RESTING}>{SESSION_TYPES.RESTING}</MenuItem>
              <MenuItem value={SESSION_TYPES.WORKING}>{SESSION_TYPES.WORKING}</MenuItem>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <Typography variant='caption' color={'error'}>{formik.errors.type}</Typography>
            )}

            <Button
              fullWidth
              type='submit'
              color='success'
              variant='contained'>
              Crear
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};