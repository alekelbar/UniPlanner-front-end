import { Avatar, Button, Container, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Link from '../common/Link';
import { pages } from './helpers/pages';
import { useSideBar } from './hooks/useSideBar';

export interface SideBarProps {
  open: boolean,
  onClose: () => void,
}


export function SideBar ({ onClose, open }: SideBarProps): JSX.Element {

  const { drawerRef, handleClose, handleLogOut, user, router } = useSideBar({ onClose });

  return (
    <Container
      sx={{
        backdropFilter: 'blur(20px)'
      }}>
      <Drawer
        sx={{
          width: '240px',
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
          {pages.map(page => {
            return (
              <Link
                key={page.title}
                href={`${page.url + user?.id}`}
                underline='none'
                sx={{
                  color: router.pathname.includes(page.url.split('/')[2])
                    ? 'common.white'
                    : 'text.primary',
                }}
              >
                <ListItem
                  sx={{
                    backgroundColor: router.pathname.includes(page.url.split('/')[2])
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
            );
          })}
          <Divider sx={{ mt: 2, mb: 2 }} />
          <ListItem>
            <Button
              variant='contained'
              fullWidth
              color='error'
              size='large'
              onClick={handleLogOut}
            >
              Salir
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Container>

  );
};