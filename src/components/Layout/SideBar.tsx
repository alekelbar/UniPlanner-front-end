import { Person, School, Settings, Task, Timelapse } from '@mui/icons-material';
import { Avatar, Button, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { logOut } from '../../helpers/local-storage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
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
  { inactiveColor: 'text.primary.dark', title: 'Carreras', color: 'text.primary', url: "careers/", icon: <School sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Tablero Kanban', color: 'text.primary', url: "kanban/", icon: <Task sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Sesiones', color: 'text.primary', url: "sessions/", icon: <Timelapse sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Perfil', color: 'text.primary', url: "profile/", icon: <Person sx={{ color: 'text.primary' }} /> },
  { inactiveColor: 'text.primary.dark', title: 'Configuración', color: 'text.primary', url: "settings/", icon: <Settings sx={{ color: 'text.primary' }} /> },
];

export function SideBar ({ onClose, open }: SideBarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector(state => state.auth);

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.clientX > 240) {
      onClose();
    }
  };

  const handleLogOut = () => {
    dispatch(onLogOut());
    logOut();
    router.push('/');
  };

  return (
    <Drawer
      sx={{
        width: '240px'
      }}
      variant='temporary'
      open={open}
      onClick={handleClose}
      onKeyUp={(event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      }}
      ref={drawerRef}
    >
      <List sx={{ mb: 2 }}>
        <ListItem>
          <ListItemIcon>
            <Avatar src='https://scontent.fsjo9-1.fna.fbcdn.net/v/t39.30808-6/301999029_768418684471692_6904334561164990019_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qU9upZvwbD8AX9W2_QB&_nc_ht=scontent.fsjo9-1.fna&oh=00_AfAMrmTizvtbNEoLUEyqBZIFAq7VPmZsEyroAiyKtFeJCQ&oe=6445C19C' />
          </ListItemIcon>
          <ListItemText
            primary={user?.fullname}
            secondary={user?.email}
            sx={{ mb: 1 }}
          />
        </ListItem>
      </List>
      <Divider sx={{ mb: 2 }} />
      <List>
        {pages.map(page => (
          <Link
            key={page.title}
            href={`/home/${page.url + user?.id}`}
            underline='none'
            sx={{
              color: router.pathname.includes(page.url)
                ? 'common.white'
                : 'text.primary',
            }}
          >
            <ListItem
              sx={{
                backgroundColor: router.pathname.includes(page.url)
                  ? ({ palette: { primary } }) => primary.dark
                  : 'transparent',
              }}
            >
              <Stack direction={'row'}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </Stack>
            </ListItem>
          </Link>
        ))}
        <Divider sx={{ mt: 2, mb: 2 }} />
        <ListItem disablePadding>
          <Button
            variant='contained'
            fullWidth
            size='small'
            onClick={handleLogOut}
          >
            Salir
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};