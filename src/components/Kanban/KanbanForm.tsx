import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { v1 as uuidV1 } from 'uuid';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux';
import { addTask } from '../../redux/slices/kanban/kanban-slice';
import { KanbanTaskModel } from '../../redux/slices/kanban/models/taskModel';

interface KanbanAddProps {
  open: boolean;
  onClose: () => void;
}

export const KanbanAdd = ({ onClose, open }: KanbanAddProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(st => st.auth);
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';


  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    onSubmit: async (values, { resetForm }) => {
      const { content, title } = values;
      const task: KanbanTaskModel = {
        id: uuidV1(),
        content,
        title,
        status: "TODO",
        user: user!.id
      };

      dispatch(addTask(task));
      resetForm();
      onClose();
    },
    validationSchema: Yup.object({
      content: Yup
        .string()
        .required("La descripción de la tarea es requerida")
        .min(5, "Trate de usar al menos 5 caracteres"),
      title: Yup
        .string()
        .required("El nombre de la tarea es requerida")
        .min(5, "Trate de usar al menos 5 caracteres")
    }),
  });

  return (
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
        Nueva Tarea
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
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            type={'text'}
            onBlur={formik.handleBlur}
            autoComplete="off"
            rows={2}
            multiline
            placeholder="Nombre"
            helperText="¿Como va a nombrar a esta tarea?" />

          {formik.touched.title && formik.errors.title && (
            <Typography variant='caption' color={'primary.main'}>{formik.errors.title}</Typography>
          )}

          <TextField
            fullWidth
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            type={'text'}
            onBlur={formik.handleBlur}
            autoComplete="off"
            rows={2}
            multiline
            placeholder="descripción"
            helperText="¿Como va a nombrar a esta tarea?" />

          {formik.touched.content && formik.errors.content && (
            <Typography variant='caption' color={'primary.main'}>{formik.errors.content}</Typography>
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
  );
};