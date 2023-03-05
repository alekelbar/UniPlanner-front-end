import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { RESPONSES } from '../../interfaces/response-messages';
import { CreateTask, TASK_STATUS } from '../../interfaces/task-interface';
import { useAppDispatch, useAppSelector } from '../../redux';
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
  const { selected } = useAppSelector(st => st.tasks);
  const [selectedTask, setSelectedTask] = useState(selected);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { descripcion, name, status } = values;

      const response = await dispatch(startUpdateTask({
        name,
        descripcion,
        status,
        _id: selectedTask?._id
      }));

      if (response !== RESPONSES.SUCCESS) {
        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            await Swal.fire('Parece que no tiene autorización para estar aquí 🔒');
            router.push("/auth");
            onClose();
            return;
          case RESPONSES.BAD_REQUEST:
            await Swal.fire('Parece que ocurrio un error🔒', response);
            return;
        }
      }

      formik.resetForm(initialValues);
      onClose();
    },
    validationSchema: Yup.object({
      descripcion: Yup
        .string()
        .required("La descripción de la tarea es requerida"),
      name: Yup
        .string()
        .required("El nombre de la tarea es requerida"),
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
        onClose={onClose}
        open={open}>
        <DialogTitle>
          <Typography
            component={'p'}
            variant='subtitle1'
            align='center'>
            ¿Vas a agregar una nueva tarea? 😊
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
              fullWidth
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type={'text'}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Nombre"
              helperText="¿Como va a nombrar a esta tarea?" />

            {formik.touched.name && formik.errors.name && (
              <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
            )}

            <TextField
              fullWidth
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
              type={'text'}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Descripción"
              helperText="¿Como describe esta tarea?" />

            {formik.touched.descripcion && formik.errors.descripcion && (
              <Typography variant='caption' color={'error'}>{formik.errors.descripcion}</Typography>
            )}

            <Select
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={'status'}>
              <MenuItem value={TASK_STATUS.COMPLETED}>{TASK_STATUS.COMPLETED}</MenuItem>
              <MenuItem value={TASK_STATUS.IMCOMPLETED}>{TASK_STATUS.IMCOMPLETED}</MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <Typography variant='caption' color={'error'}>{formik.errors.status}</Typography>
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
