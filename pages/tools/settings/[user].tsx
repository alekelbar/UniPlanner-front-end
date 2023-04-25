import { ColorLens } from '@mui/icons-material';
import { Button, Container, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Loading } from '../../../src/components';
import { isValidToken } from '../../../src/helpers/isValidToken';
import { RESPONSES } from '../../../src/interfaces/response-messages';
import { Setting } from '../../../src/interfaces/settings-interfaces';
import { useAppDispatch, useAppSelector } from '../../../src/redux';
import { startLoadSetting, startUpdateSetting } from '../../../src/redux/thunks/settings-thunks';
import { Formik } from 'formik';

const SettingsPage = () => {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const width = fullScreen ? '100%' : '50%';

  const router = useRouter();
  const { query } = router;

  const dispatch = useAppDispatch();

  const onLoad = async () => {
    const response = await dispatch(startLoadSetting(query.user as string));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  };

  useEffect(() => {
    onLoad();
  }, [query.user]);

  const { selected, loading } = useAppSelector(state => state.setting);

  const handleSubmit = async (values: Setting) => {
    const { user, _id } = selected as Setting;

    const response = await dispatch(startUpdateSetting({ ...values, user, _id }));

    if (response !== RESPONSES.SUCCESS) {
      if (response === RESPONSES.UNAUTHORIZE) {
        router.push('/');
        await Swal.fire('Parece que tú sesión expiro, inicia sesión porfavor... 😥', response);
        return;
      }
      await Swal.fire('Algo salio mal 😥', response);
    }
    await Swal.fire('Preferencias actualizadas 👌');
  };

  if (loading) return <Loading called='settings' />;

  return (
    <Container sx={{ mt: 9, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Formik initialValues={selected} onSubmit={handleSubmit}>
        {props => (
          <>
            <Paper sx={{ width, py: 2 }} component={'form'} onSubmit={props.handleSubmit}>
              <Stack justifyContent={'center'} alignItems={'center'} direction={'row'}>
                <Typography variant='h2' fontSize={'1em'}>Configuraciones de usuario</Typography>
              </Stack>
              <Container>
                {/* Parte A */}
                <Stack direction={'row'} justifyContent={'center'}>
                  <Typography variant='subtitle1'>
                    <ColorLens sx={{ fontSize: '4em' }} />
                  </Typography>
                </Stack>
                <Stack mt={3}
                  direction={'row'}
                  alignItems={'center'}
                  spacing={2}
                  justifyContent={'center'}
                  width={'100%'}>
                  <TextField
                    type="color"
                    sx={{
                      width: '70%'
                    }}
                    name={'do'}
                    value={props.values.do}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={'Prio. 1'}
                  />
                  {props.touched.do && props.errors.do && (
                    <Typography variant='caption' color={'error'}>{props.errors.do}</Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: '70%'
                    }}
                    name={'prepare'}
                    value={props.values.prepare}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={'Prio. 2'}
                  />
                  {props.touched.prepare && props.errors.prepare && (
                    <Typography variant='caption' color={'error'}>{props.errors.prepare}</Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: '70%'
                    }}
                    name={'delegate'}
                    value={props.values.delegate}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={'Prio. 3'}
                  />
                  {props.touched.delegate && props.errors.delegate && (
                    <Typography variant='caption' color={'error'}>{props.errors.delegate}</Typography>
                  )}
                  <TextField
                    type="color"
                    sx={{
                      width: '70%'
                    }}
                    name={'ignore'}
                    value={props.values.ignore}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    helperText={'Prio. 4'}
                  />
                  {props.touched.ignore && props.errors.ignore && (
                    <Typography variant='caption' color={'error'}>{props.errors.ignore}</Typography>
                  )}
                </Stack>
                {/* Parte B */}
                <Stack direction={'row'} justifyContent={'center'} mt={1}>
                  <Button sx={{ width: '50%' }} data-testid='aply-changes' type='submit' variant='contained'>Aplicar cambios</Button>
                </Stack>
              </Container>
            </Paper>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
    : {
      props: {},
    };
};
