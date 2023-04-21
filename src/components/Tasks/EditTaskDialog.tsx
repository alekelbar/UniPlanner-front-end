import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { logOut } from '../../helpers/local-storage';
import { RESPONSES } from '../../interfaces/response-messages';
import { CreateTask, TASK_STATUS } from '../../interfaces/task-interface';
import { useAppDispatch, useAppSelector } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startUpdateTask } from '../../redux/thunks/tasks-thunks';

interface EditTaskDialogProps {
  open: boolean,
  onClose: () => void,
}

const initialValues: CreateTask = {
  descripcion: "",
  name: "",
  status: TASK_STATUS.IMCOMPLETED
};

export default function EditTaskDialog ({ onClose, open }: EditTaskDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query: { deliveryId, deliveryName, userId } } = router;

  const { selected } = useAppSelector(st => st.tasks);
  const [selectedTask, setSelectedTask] = useState(selected);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { descripcion, name, status } = values;

      const response = await dispatch(startUpdateTask({
        name,
        descripcion,
        status,
        _id: selectedTask._id,
        delivery: deliveryId as string
      }));

      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }
      formik.resetForm(initialValues);
      onClose();
    },
    validationSchema: Yup.object({
      descripcion: Yup
        .string()
        .required("La descripción de la tarea es requerida")
        .min(5, "Trate de usar al menos 5 caracteres"),
      name: Yup
        .string()
        .required("El nombre de la tarea es requerida")
        .min(5, "Trate de usar al menos 5 caracteres"),
      status: Yup
        .string()
        .required("El status de la tarea es requerida"),
    }),
  });

  useEffect(() => {
    setSelectedTask(selected);
    if (selected) {
      formik.setFieldValue('descripcion', selected?.descripcion);
      formik.setFieldValue('name', selected?.name);
      formik.setFieldValue('status', selected?.status);
    }
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
          Actualización de Tarea
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
              rows={2}
              multiline
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Nombre"
              helperText="¿Como va a nombrar a esta tarea?" />

            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'primary.main'}>{formik.errors.name}</Typography>
            )}

            <TextField
              fullWidth
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              type={'text'}
              rows={2}
              multiline
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Descripción"
              helperText="¿Como describe esta tarea?" />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <Typography variant='caption' color={'primary.main'}>{formik.errors.descripcion}</Typography>
            )}

            <Select
              fullWidth
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'status'}>
              <MenuItem value={TASK_STATUS.COMPLETED}>{TASK_STATUS.COMPLETED}</MenuItem>
              <MenuItem value={TASK_STATUS.IMCOMPLETED}>{TASK_STATUS.IMCOMPLETED}</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <Typography variant='caption' color={'primary.main'}>{formik.errors.status}</Typography>
            )}

            <Button
              fullWidth
              type='submit'
              color='success'
              variant='contained'>
              Actualizar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
