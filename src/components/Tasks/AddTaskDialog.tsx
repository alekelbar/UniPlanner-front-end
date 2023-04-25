import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { RESPONSES } from '../../interfaces/response-messages';
import { CreateTask, TASK_STATUS } from '../../interfaces/task-interface';
import { useAppDispatch } from '../../redux';
import { startCreateTask } from '../../redux/thunks/tasks-thunks';

interface AddTaskDialogProps {
  open: boolean,
  onClose: () => void,
}

const initialValues: CreateTask = {
  descripcion: "",
  name: "",
  status: TASK_STATUS.IMCOMPLETED
};

export default function AddTaskDialog ({ onClose, open }: AddTaskDialogProps):
  JSX.Element {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query: { deliveryId } } = router;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { descripcion, name, status } = values;
      const response = await dispatch(startCreateTask({
        delivery: deliveryId as string,
        name,
        descripcion,
        status,
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
          Nueva Tarea de entrega
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
              helperText="¿Como va a nombrar a esta tarea?" />

            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.name}</Typography>
            )}

            <TextField
              fullWidth
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              type={'text'}
              onBlur={formik.handleBlur}
              autoComplete="off"
              rows={2}
              multiline
              placeholder="Descripción"
              helperText="¿Como describe esta tarea?" />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <Typography variant='caption' color={'info.main'}>{formik.errors.descripcion}</Typography>
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
              <Typography variant='caption' color={'info.main'}>{formik.errors.status}</Typography>
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
}
