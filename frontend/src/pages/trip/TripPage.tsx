import { useState } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ShareIcon from '@mui/icons-material/Share';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CURRENT_USER_ID, completeTrip, deleteTrip, getTrip, getUser } from '../../data/mockData';
import type { Trip, TripStatus, User } from '../../types';
import { formatDateRange, statusColors, statusLabels, tripDays } from '../../utils/format';
import NotFoundPage from '../NotFoundPage';
import TripScene from '../../components/TripScene';

const tabs = [
  { label: 'Обзор', path: '' },
  { label: 'План', path: 'plan' },
  { label: 'Бюджет', path: 'budget' },
  { label: 'Чат', path: 'chat' },
];

export interface TripOutletContext {
  trip: Trip;
  participants: User[];
  isMember: boolean;
}

export default function TripPage() {
  const { tripId } = useParams();
  const trip = getTrip(Number(tripId));
  if (!trip) return <NotFoundPage />;
  return <TripView key={trip.id} trip={trip} />;
}

function TripView({ trip }: { trip: Trip }) {
  const location = useLocation();
  const navigate = useNavigate();

  const joinedByInvite = (location.state as { joined?: boolean } | null)?.joined === true;
  const [participantIds, setParticipantIds] = useState<number[]>(() =>
    joinedByInvite && !trip.participantIds.includes(CURRENT_USER_ID)
      ? [...trip.participantIds, CURRENT_USER_ID]
      : trip.participantIds,
  );
  const [toast, setToast] = useState<string | null>(joinedByInvite ? 'Вы присоединились к поездке!' : null);
  const [status, setStatus] = useState<TripStatus>(trip.status);
  const [confirm, setConfirm] = useState<'complete' | 'delete' | null>(null);

  const participants = participantIds.map(getUser).filter((u): u is User => Boolean(u));
  const isMember = participantIds.includes(CURRENT_USER_ID);
  const isAuthor = trip.authorId === CURRENT_USER_ID;
  const isFull = participantIds.length >= trip.maxParticipants;

  const lastSegment = location.pathname.split('/').pop() ?? '';
  const currentTab = tabs.some((t) => t.path === lastSegment) ? lastSegment : '';

  const toggleMembership = () => {
    if (isMember) {
      setParticipantIds((ids) => ids.filter((id) => id !== CURRENT_USER_ID));
      setToast('Вы вышли из поездки');
    } else {
      setParticipantIds((ids) => [...ids, CURRENT_USER_ID]);
      setToast('Вы присоединились к поездке!');
    }
  };

  const copyInvite = async () => {
    const inviteLink = `${window.location.origin}/join/${trip.inviteCode}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setToast('Ссылка-приглашение скопирована');
    } catch {
      setToast(`Код приглашения: ${trip.inviteCode}`);
    }
  };

  const handleConfirm = () => {
    if (confirm === 'complete') {
      completeTrip(trip.id);
      setStatus('completed');
      setToast('Поездка завершена');
    }
    if (confirm === 'delete') {
      deleteTrip(trip.id);
      navigate('/');
    }
    setConfirm(null);
  };

  const context: TripOutletContext = { trip: { ...trip, status, participantIds }, participants, isMember };

  return (
    <Stack spacing={2}>
      <Breadcrumbs>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Мои поездки
        </Link>
        <Typography color="text.primary">{trip.title}</Typography>
      </Breadcrumbs>

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Stack
          direction="row"
          spacing={{ xs: 2, md: 3 }}
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: { xs: 2, md: 3 }, alignItems: 'center' }}
        >
          <Box
            sx={{
              width: { xs: 76, md: 112 },
              height: { xs: 76, md: 112 },
              flexShrink: 0,
              borderRadius: '50%',
              border: '4px solid #FFFFFF',
              overflow: 'hidden',
            }}
          >
            <TripScene scene={trip.scene} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Chip label={statusLabels[status]} color={statusColors[status]} size="small" sx={{ mb: 1 }} />
            <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.4rem', md: '2.1rem' } }}>
              {trip.title}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 3 }} sx={{ mt: 1, opacity: 0.9 }}>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <PlaceIcon fontSize="small" />
                <Typography variant="body2">
                  {trip.destination}, {trip.country}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <CalendarMonthIcon fontSize="small" />
                <Typography variant="body2">
                  {formatDateRange(trip.startDate, trip.endDate)} · {tripDays(trip.startDate, trip.endDate)} дн.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ p: 2, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}
        >
          <Typography color="text.secondary">
            Участников: {participantIds.length} из {trip.maxParticipants}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            {isMember && status !== 'completed' && (
              <Button variant="outlined" startIcon={<ShareIcon />} onClick={copyInvite}>
                Пригласить · код {trip.inviteCode}
              </Button>
            )}
            {status !== 'completed' && !isAuthor && (
              <Button
                variant={isMember ? 'outlined' : 'contained'}
                color={isMember ? 'inherit' : 'secondary'}
                startIcon={isMember ? <LogoutIcon /> : <GroupAddIcon />}
                disabled={!isMember && isFull}
                onClick={toggleMembership}
              >
                {isMember ? 'Выйти из поездки' : isFull ? 'Мест нет' : 'Присоединиться'}
              </Button>
            )}
            {isAuthor && status !== 'completed' && (
              <Button variant="contained" startIcon={<TaskAltIcon />} onClick={() => setConfirm('complete')}>
                Завершить
              </Button>
            )}
            {isAuthor && (
              <Button variant="outlined" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => setConfirm('delete')}>
                Удалить
              </Button>
            )}
          </Stack>
        </Stack>

        <Tabs
          value={currentTab}
          onChange={(_, value: string) => navigate(value === '' ? `/trips/${trip.id}` : `/trips/${trip.id}/${value}`)}
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ borderTop: 1, borderColor: 'divider', px: 1 }}
        >
          {tabs.map((t) => (
            <Tab key={t.path} label={t.label} value={t.path} />
          ))}
        </Tabs>
      </Paper>

      <Outlet context={context} />

      <Dialog open={confirm !== null} onClose={() => setConfirm(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{confirm === 'delete' ? 'Удалить поездку?' : 'Завершить поездку?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirm === 'delete'
              ? `«${trip.title}» будет удалена вместе с планом, бюджетом и чатом. Это действие нельзя отменить.`
              : `«${trip.title}» переместится в завершённые. План и бюджет останутся доступны для просмотра.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(null)}>Отмена</Button>
          <Button
            variant="contained"
            color={confirm === 'delete' ? 'error' : 'primary'}
            onClick={handleConfirm}
          >
            {confirm === 'delete' ? 'Удалить' : 'Завершить'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast !== null} autoHideDuration={3000} onClose={() => setToast(null)}>
        <Alert severity="success" variant="filled" onClose={() => setToast(null)}>
          {toast}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
