import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import UserAvatar from './UserAvatar';
import IslandIcon from './IslandIcon';
import { ink, strawberry, strawberryDeep } from '../theme';
import { CURRENT_USER_ID, getUser } from '../data/mockData';

const mainItems = [
  { label: 'Мои поездки', path: '/', icon: <LuggageIcon /> },
  { label: 'Создать поездку', path: '/trips/new', icon: <AddCircleIcon /> },
];

const mobileItems = [...mainItems, { label: 'Профиль', path: '/profile', icon: <PersonIcon /> }];


function navButtonSx(selected: boolean) {
  return selected
    ? { px: 2.25, bgcolor: strawberry, color: strawberryDeep, '&:hover': { bgcolor: '#FADCDF' } }
    : {
        px: 2.25,
        color: ink,
        border: '1px solid rgba(46, 58, 39, 0.3)',
        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
      };
}

function activePath(pathname: string): string {
  if (pathname === '/trips/new') return '/trips/new';
  if (pathname.startsWith('/profile')) return '/profile';
  return '/';
}

export default function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const current = activePath(location.pathname);
  const me = getUser(CURRENT_USER_ID)!;
  const profileSelected = current === '/profile';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Container maxWidth="lg" disableGutters={isMobile}>
          <Toolbar sx={{ gap: 1.5, minHeight: { md: 72 } }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
            >
              <IslandIcon size={34} color={ink} />
              <Typography variant="h6" component="span" sx={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1, color: ink }}>
                happytravel
              </Typography>
            </Box>

            {!isMobile && (
              <>
                {mainItems.map((item) => {
                  const selected = current === item.path;
                  return (
                    <Button
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                      sx={navButtonSx(selected)}
                    >
                      {item.label}
                    </Button>
                  );
                })}

                <Button
                  component={RouterLink}
                  to="/profile"
                  startIcon={
                    <Box sx={{ border: '2px solid #FFFFFF', borderRadius: '50%', display: 'flex' }}>
                      <UserAvatar user={me} size={26} showTooltip={false} />
                    </Box>
                  }
                  sx={{ py: 0.5, ...navButtonSx(profileSelected) }}
                >
                  Профиль
                </Button>
              </>
            )}

            <Tooltip title="Выйти">
              <IconButton onClick={() => navigate('/login')} aria-label="Выйти" sx={{ color: ink, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' } }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" component="main" sx={{ flexGrow: 1, py: { xs: 3, md: 4 }, pb: isMobile ? 11 : 4 }}>
        <Outlet />
      </Container>

      {isMobile && (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={8}>
          <BottomNavigation value={current} onChange={(_, value: string) => navigate(value)} showLabels>
            {mobileItems.map((item) => (
              <BottomNavigationAction key={item.path} label={item.label} value={item.path} icon={item.icon} />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}
