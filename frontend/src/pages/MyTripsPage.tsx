import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TripCircle, { NewTripCircle } from '../components/TripCircle';
import EmptyState from '../components/EmptyState';
import { CURRENT_USER_ID, trips } from '../data/mockData';
import type { Trip } from '../types';

type Filter = 'active' | 'organized' | 'completed';

const filters: { value: Filter; label: string; match: (t: Trip) => boolean }[] = [
  { value: 'active', label: 'Предстоящие', match: (t) => t.status !== 'completed' },
  { value: 'organized', label: 'Я организатор', match: (t) => t.authorId === CURRENT_USER_ID },
  { value: 'completed', label: 'Завершённые', match: (t) => t.status === 'completed' },
];

export default function MyTripsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('active');
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState('');

  const myTrips = trips.filter((t) => t.participantIds.includes(CURRENT_USER_ID));
  const current = filters.find((f) => f.value === filter)!;
  const visible = myTrips.filter(current.match);

  const openInvite = () => {
    if (!code.trim()) return;
    setCodeOpen(false);
    navigate(`/join/${encodeURIComponent(code.trim())}`);
  };

  return (
    <Stack spacing={3} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          Мои поездки
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<VpnKeyIcon />}
          onClick={() => setCodeOpen(true)}
          sx={{ position: { md: 'absolute' }, right: { md: 0 }, top: { md: '50%' }, transform: { md: 'translateY(-50%)' } }}
        >
          У меня есть код
        </Button>
      </Box>

      <Tabs
        value={filter}
        onChange={(_, v: Filter) => setFilter(v)}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ maxWidth: '100%', '& .MuiTabs-flexContainer': { justifyContent: 'center' } }}
      >
        {filters.map((f) => (
          <Tab key={f.value} value={f.value} label={`${f.label} (${myTrips.filter(f.match).length})`} />
        ))}
      </Tabs>

      {visible.length === 0 && filter === 'completed' ? (
        <EmptyState title="Завершённых поездок пока нет" text="Здесь появятся поездки, которые вы уже завершили." />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: { xs: 2, md: 4 },
            rowGap: { xs: 3, md: 5 },
            py: 2,
            width: '100%',
          }}
        >
          {visible.map((trip) => (
            <TripCircle key={trip.id} trip={trip} />
          ))}
          {filter !== 'completed' && <NewTripCircle />}
        </Box>
      )}

      <Dialog open={codeOpen} onClose={() => setCodeOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Присоединиться по коду</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Введите код, который прислал организатор поездки. Например: <b>JAPAN</b>
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Код приглашения"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && openInvite()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodeOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={openInvite} disabled={!code.trim()}>
            Найти поездку
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
