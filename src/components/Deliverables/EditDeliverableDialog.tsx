
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux';
import * as Yup from 'yup';
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { format, parseISO } from 'date-fns';
import { startUpdateDelivery } from '../../redux/thunks/deliverables-thunks';
import { RESPONSES } from '../../interfaces/response-messages';
import Swal from 'sweetalert2';

interface EditDeliverableDialogProps {
  open: boolean,
  onClose: () => void,
}

export default function EditDeliverableDialog ({ onClose, open }: EditDeliverableDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selected } = useAppSelector(st => st.deliveries);

  const selectedDeadline = parseISO(selected ? selected.deadline.toString() : new Date().toString());
  const [selectedDeliverable, setSelectedDeliverable] = useState(selected);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      deadline: '',
      status: DELIVERABLE_STATUS.PENDING,
      note: 0,
      percent: 0,
    },
    onSubmit: async (values) => {
      const { deadline, description, name, note, percent, status } = values;
      const response = await dispatch(startUpdateDelivery({
        deadline: new Date(deadline),
        description,
        name,
        note,
        percent,
        status,
      }));
      if (response !== RESPONSES.SUCCESS) {
        switch (response) {
          case RESPONSES.UNAUTHORIZE:
            await Swal.fire('Parece que no tiene autorización para estar aquí 🔒');
            router.push("/auth");
            onClose();
            return;
          case RESPONSES.BAD_REQUEST:
            await Swal.fire('Parece que este entregable ya existe 🔒');
            return;
        }
      }
      onClose();
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(5, "Use almenos 5 caracteres")
        .required('El nombre del entregable es obligatorio'),
      description: Yup
        .string()
        .min(5, "Use almenos 5 caracteres")
        .required('La descripción del entregable es obligatoria'),
      deadline: Yup
        .date()
        .required('La fecha limite del entregable es obligatoria'),
      status: Yup
        .string()
        .min(5, "Use almenos 5 caracteres")
        .required('El status del entregable es obligatorio'),
      note: Yup
        .number()
        .min(0, "La nota minima es cero")
        .max(100, 'La nota maxíma es 100')
        .required('la calificación del entregable es obligatoria'),
      percent: Yup
        .number()
        .min(0, "El porcentaje minimo es cero")
        .max(100, 'El porcentaje maxíma es 100')
        .required('El porcentaje del entregable es obligatorio'),
    }),
  });

  useEffect(() => {
    setSelectedDeliverable(selected);
    if (selected) {
      formik.setFieldValue('description', selected?.description);
      formik.setFieldValue('name', selected?.name);
      formik.setFieldValue('deadline', format(selectedDeadline, 'yyyy-MM-dd').slice(0, 10));
      formik.setFieldValue('note', selected?.note);
      formik.setFieldValue('percent', selected?.percent);
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
            ¿Vas a actualizar ese entregable? 😊
          </Typography>
        </DialogTitle>
        <DialogContent>
          {
            !selectedDeliverable
              ? <Typography>Parece que no se encuentra ningún entregable seleccionado</Typography>
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
                    name="deadline"
                    onChange={formik.handleChange}
                    value={formik.values.deadline}
                    type={'date'}
                    onBlur={formik.handleBlur} />
                  {formik.touched.deadline && formik.errors.deadline && (
                    <Typography variant='caption' color={'error'}>{formik.errors.deadline}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type={'text'}
                    placeholder="¿Cual es el nombre del entregable?"
                    helperText="Entregable"
                    onBlur={formik.handleBlur} />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant='caption' color={'error'}>{formik.errors.name}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    type={'text'}
                    rows={6}
                    multiline
                    placeholder="¿Cual es la description del entregable?"
                    helperText="Descripción"
                    onBlur={formik.handleBlur} />
                  {formik.touched.description && formik.errors.description && (
                    <Typography variant='caption' color={'error'}>{formik.errors.description}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="note"
                    onChange={formik.handleChange}
                    value={formik.values.note}
                    type={'number'}
                    placeholder="¿Cual es la calificación del entregable?"
                    helperText="Calificación"
                    onBlur={formik.handleBlur} />
                  {formik.touched.note && formik.errors.note && (
                    <Typography variant='caption' color={'error'}>{formik.errors.note}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="percent"
                    onChange={formik.handleChange}
                    value={formik.values.percent}
                    type={'number'}
                    placeholder="¿Cual es el porcentaje del entregable?"
                    helperText="Porcentaje"
                    onBlur={formik.handleBlur} />
                  {formik.touched.percent && formik.errors.percent && (
                    <Typography variant='caption' color={'error'}>{formik.errors.percent}</Typography>
                  )}

                  <Select
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={'status'}>
                    <MenuItem value={DELIVERABLE_STATUS.PENDING}>{DELIVERABLE_STATUS.PENDING}</MenuItem>
                    <MenuItem value={DELIVERABLE_STATUS.SEND}>{DELIVERABLE_STATUS.SEND}</MenuItem>
                  </Select>
                  {formik.touched.status && formik.errors.status && (
                    <Typography variant='caption' color={'error'}>{formik.errors.status}</Typography>
                  )}

                  <Button
                    fullWidth
                    type='submit'
                    color='success'
                    variant='contained'>
                    Crear
                  </Button>
                </Stack>
              )
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
