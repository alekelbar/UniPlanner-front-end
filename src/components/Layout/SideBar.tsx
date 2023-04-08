import { Logout, Person, Schedule, School, Settings, Task, Timelapse } from '@mui/icons-material';
import { Button, Divider, Drawer, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { logOut } from '../../helpers/local-storage';
import { useAppDispatch } from '../../redux/hooks';
import { onLogOut } from '../../redux/slices/auth/authSlice';
import Link from '../common/Link';

interface SideBarProps {
  open: boolean,
  onClose: () => void,
}

interface Page {
  title: string;
  url: string;
  color: string;
  inactiveColor: string;
  icon: React.ReactNode;
}
const pages: Page[] = [
  { inactiveColor: 'text.primary.dark', title: 'Carreras', color: 'text.primary', url: "careers", icon: <School sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Tablero Kanban', color: 'text.primary', url: "kanban", icon: <Task sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Sesiones', color: 'text.primary', url: "sessions", icon: <Timelapse sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Perfil', color: 'text.primary', url: "profile", icon: <Person sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Configuración', color: 'text.primary', url: "settings", icon: <Settings sx={{ color: 'text.primary' }} /> },
];

export function SideBar ({ onClose, open }: SideBarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.clientX > 175) {
      onClose();
    }
  };

  const handleLogOut = () => {
    dispatch(onLogOut());
    logOut();
    router.push('/');
  };

  return (
    <Container onClick={handleClose}>
      <Drawer
        sx={{
          backdropFilter: 'blur(3px)',
        }}
        variant='temporary'
        open={open}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        }}
        ref={drawerRef}
      >
        <Grid container maxWidth="lg" sx={{ width: '240px' }}>

          <Grid xs={12} item display={'flex'} flexDirection="column" sx={{ placeItems: 'center' }}>
            <Typography
              variant='h4'
            >
              <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}>
                UniPlanner
                <Schedule sx={{ fontSize: '2em', py: 2 }} />
              </Stack>
            </Typography>
          </Grid>
          <Grid container spacing={1} >
            {pages.map(page => {
              return (
                <Grid item xs={12} key={page.title}>
                  <Link
                    href={`/home/${page.url}`}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      width: '100%',
                      display: 'block',
                      color: page.color,
                      textDecoration: 'none',
                      backgroundColor: (router.pathname.includes(page.url))
                        ? ({ palette: { primary } }) => primary.dark
                        : '',
                    }}
                  >
                    <Stack sx={{ placeItems: 'center', p: 2 }}>
                      <Typography
                        sx={{
                          color: page.color,
                        }}
                        align="center"
                      >{page.title}</Typography>
                      {page.icon}
                    </Stack>
                  </Link>
                  <Divider />
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: '5px',
                  py: '10px',
                }}
                onClick={() => { onClose(); handleLogOut(); }}
                color={'warning'}
                size="small"
              >
                <Stack m={'0 auto'} justifyContent={'center'} alignItems="center">
                  <Typography
                    variant='subtitle1'
                    sx={{
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    {'Salir'}
                  </Typography>
                  <Logout />
                </Stack>
              </Button>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Container >

  );
}
