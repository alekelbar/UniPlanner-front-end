import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { Career } from '../../interfaces/career.interface';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { startAddCareer } from '../../redux/thunks/user.thunks';
import Swal from 'sweetalert2';

interface AddCareerDialogProps {
  open: boolean,
  onClose: () => void,
  userCareers: Career[];
  allCareers: Career[];
}

export const AddCareerDialog: React.FC<AddCareerDialogProps> = ({ userCareers, allCareers, onClose, open }) => {

  const careersState = allCareers.filter((e) => {
    return !!!userCareers.find((c) => c._id === e._id);
  });

  if (careersState.length === 0 && open) {
    Swal.fire('¡Cuidado!', 'Usted ya se encuentra inscrito en todas las carreras disponibles');
    onClose();
    return null;
  }

  const careerSelected = careersState.at(0)?._id;

  const { user } = useAppSelector(st => st.auth);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      career: careerSelected,
    },
    onSubmit: async (values) => {
      const { career } = values;

      if (user && career) {
        const response = await dispatch(startAddCareer(career));
        console.log(response);
        onClose();
      }
    },
    validationSchema: Yup.object({
      career: Yup.string().required(),
    }),

  });

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>
          <Typography component={'span'} variant='button'>Carreras</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component='span' variant='body1'>Selecciona la carrera que desees</Typography>
          </DialogContentText>
          <Box component={'form'} onSubmit={formik.handleSubmit}>
            <Select
              fullWidth
              sx={{ mt: 1 }}
              value={formik.values.career}
              label="career"
              name={'career'}
              onChange={formik.handleChange}
            >
              {careersState?.map(career => {
                return (
                  <MenuItem key={career._id} value={career._id}>
                    {career.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Button type='submit'>Agregar</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
