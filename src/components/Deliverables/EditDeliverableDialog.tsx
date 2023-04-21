
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { logOut } from '../../helpers/local-storage';
import { makePriority } from '../../helpers/priorityCalc';
import { DELIVERABLE_STATUS } from '../../interfaces/deliveries.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startUpdateDelivery } from '../../redux/thunks/deliverables-thunks';

interface EditDeliverableDialogProps {
  open: boolean,
  onClose: () => void,
}

export default function EditDeliverableDialog ({ onClose, open }: EditDeliverableDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query: { courseId } } = router;

  const { selected } = useAppSelector(st => st.deliveries);
  const { selected: selectedSetting } = useAppSelector(st => st.setting);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

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

      const { importance, urgency } = makePriority(new Date(deadline), percent >= selectedSetting!.importance
        ? true
        : false
      );

      const response = await dispatch(startUpdateDelivery({
        deadline: new Date(deadline).toString(),
        description,
        name,
        note,
        percent,
        status,
        importance,
        urgency,
        course: courseId as string,
        _id: selected?._id
      }));
      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
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
      formik.setFieldValue('deadline', format(selectedDeadline, `yyyy-MM-dd'T'HH:mm`));
      formik.setFieldValue('note', selected?.note);
      formik.setFieldValue('percent', selected?.percent);
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
          Actualización de Entrega
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
                    type={'datetime-local'}
                    onBlur={formik.handleBlur}
                    autoComplete='off' />
                  {formik.touched.deadline && formik.errors.deadline && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.deadline}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type={'text'}
                    placeholder="¿Cual es el nombre del entregable?"
                    helperText="Entregable"
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    rows={2}
                    multiline />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.name}</Typography>
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
                    onBlur={formik.handleBlur}
                    autoComplete='off' />
                  {formik.touched.description && formik.errors.description && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.description}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="note"
                    onChange={formik.handleChange}
                    value={formik.values.note}
                    type={'number'}
                    placeholder="¿Cual es la calificación del entregable?"
                    helperText="Calificación"
                    onBlur={formik.handleBlur}
                    autoComplete='off' />
                  {formik.touched.note && formik.errors.note && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.note}</Typography>
                  )}

                  <TextField
                    fullWidth
                    name="percent"
                    onChange={formik.handleChange}
                    value={formik.values.percent}
                    type={'number'}
                    placeholder="¿Cual es el porcentaje del entregable?"
                    helperText="Porcentaje"
                    onBlur={formik.handleBlur}
                    autoComplete='off' />
                  {formik.touched.percent && formik.errors.percent && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.percent}</Typography>
                  )}

                  <Select
                    fullWidth
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={'status'}>
                    <MenuItem value={DELIVERABLE_STATUS.PENDING}>{DELIVERABLE_STATUS.PENDING}</MenuItem>
                    <MenuItem value={DELIVERABLE_STATUS.SEND}>{DELIVERABLE_STATUS.SEND}</MenuItem>
                  </Select>
                  {formik.touched.status && formik.errors.status && (
                    <Typography variant='caption' color={'primary.contrastText'}>{formik.errors.status}</Typography>
                  )}

                  <Button
                    fullWidth
                    type='submit'
                    color='success'
                    variant='contained'>
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
