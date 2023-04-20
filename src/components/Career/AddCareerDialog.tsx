import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Career } from '../../interfaces/career.interface';
import { RESPONSES } from '../../interfaces/response-messages';
import { useAppDispatch } from '../../redux/hooks';
import { startAddCareer } from '../../redux/thunks/careers-thunks';

interface AddCareerDialogProps {
  open: boolean,
  onClose: () => void,
  careers: Career[];
}

export function AddCareerDialog ({ careers, onClose, open }: AddCareerDialogProps): JSX.Element {


  const router = useRouter();
  const { query: { id } } = router;

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const formik = useFormik({
    initialValues: {
      career: '',
    },
    onSubmit: async (values) => {
      const { career } = values;

      const response = await dispatch(startAddCareer(career, id as string));
      if (response !== RESPONSES.SUCCESS) {
        await Swal.fire(response);
      }
      onClose();
    },
    validationSchema: Yup.object({
      career: Yup.string().min(5, 'Seleccione una carrera').required('Seleccione una carrera'),
    }),

  });


  return (
    <>
      <Dialog onClose={onClose} open={open} sx={{
        '& .MuiDialog-paper': {
          width: width
        }
      }}>
        <DialogTitle>
          <Typography component={'span'} variant='button'>Carreras disponibles</Typography>
        </DialogTitle>
        <DialogContent>
          <Box component={'form'} onSubmit={formik.handleSubmit}>
            <Select
              fullWidth
              sx={{ mt: 1 }}
              value={formik.values.career}
              label="career"
              name={'career'}
              onChange={formik.handleChange}
            >
              {careers.map((career, idx) => {
                const selected = !idx ? true : false;
                return (
                  <MenuItem selected={selected} key={career._id} value={career._id}>{career.name}</MenuItem>
                );
              })}
            </Select>
            {formik.touched.career && formik.errors.career && (
              <Typography variant='caption' color={'error'}>{formik.errors.career}</Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Agregar carrera
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
