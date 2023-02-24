import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { logOut } from '../../helpers/local-storage';
import { Career } from '../../interfaces/career.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import { startAddCareer } from '../../redux/thunks/user.thunks';

interface AddCareerDialogProps {
  open: boolean,
  onClose: () => void,
  careers: Career[];
}

export function AddCareerDialog ({ careers, onClose, open }: AddCareerDialogProps): JSX.Element {
  const router = useRouter();

  const careerSelected = careers.at(0) ? careers.at(0)?._id : "";

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
        if (response === RESPONSES.UNAUTHORIZE) {
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not authorized to perform this action',
          });
          logOut();
          dispatch(onLogOut());
          router.replace('/auth');
        }

        if (response !== RESPONSES.SUCCESS) {
          Swal.fire('¡Cuidado!', response);
          onClose();
          return;
        }
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
          <Typography component={'span'} variant='button'>Carreras disponibles</Typography>
        </DialogTitle>
        <DialogContent>
          {careerSelected !== ""
            ? (
              <Box component={'form'} onSubmit={formik.handleSubmit}>
                <Select
                  fullWidth
                  sx={{ mt: 1 }}
                  value={formik.values.career}
                  label="career"
                  name={'career'}
                  onChange={formik.handleChange}
                >
                  {careers?.map(career => {
                    return (
                      <MenuItem key={career._id} value={career._id}>
                        {career.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <Button variant='contained' sx={{ mt: 2 }} type='submit'>Agregar</Button>
              </Box>
            )
            : (
              <DialogContentText>
                Parece que ya te encuentras registrado en todas las carreras
              </DialogContentText>
            )
          }

        </DialogContent>
      </Dialog>
    </>
  );
}

