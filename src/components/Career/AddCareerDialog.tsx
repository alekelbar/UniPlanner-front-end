import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { Career } from '../../interfaces/career.interface';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface AddCareerDialogProps {
  open: boolean,
  onClose: () => void,
  userCareers: Career[];
  allCareers: Career[];
}

export const AddCareerDialog: React.FC<AddCareerDialogProps> = ({ userCareers, allCareers, onClose, open }) => {
  const careersState = allCareers.filter(e => !userCareers.includes(e));

  const careerSelected = allCareers.at(0)?._id;

  const formik = useFormik({
    initialValues: {
      career: careerSelected,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({

    }),

  });

  return (
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
  );
};
