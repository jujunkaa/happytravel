import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EmptyState from '../components/EmptyState';
import TripScene from '../components/TripScene';
import UserAvatar, { AvatarStack } from '../components/UserAvatar';
import { CURRENT_USER_ID, getTripByInviteCode, getUser } from '../data/mockData';
import type { User } from '../types';
import { formatDateRange, formatMoney } from '../utils/format';

export default function JoinTripPage() {
  const { code = '' } = useParams();
  const navigate = useNavigate();
  const trip = getTripByInviteCode(code);

  if (!trip) {
    return (
      <EmptyState
        title="Приглашение не найдено"
        text={`Код «${code}» недействителен. Проверьте его у организатора поездки.`}
        action={
          <Button component={RouterLink} to="/" variant="contained">
            К моим поездкам
          </Button>
        }
      />
    );
  }

  const author = getUser(trip.authorId);
  const participants = trip.participantIds.map(getUser).filter((u): u is User => Boolean(u));
  const alreadyMember = trip.participantIds.includes(CURRENT_USER_ID);
  const isFull = trip.participantIds.length >= trip.maxParticipants;

  return (
    <Card sx={{ maxWidth: 560, mx: 'auto' }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 3, alignItems: 'center' }}
      >
        <Box sx={{ width: 88, height: 88, flexShrink: 0, borderRadius: '50%', border: '4px solid #FFFFFF', overflow: 'hidden' }}>
          <TripScene scene={trip.scene} />
        </Box>
        <Box>
          <Typography variant="overline" sx={{ opacity: 0.85 }}>
            Вас приглашают в поездку
          </Typography>
          <Typography variant="h5" component="h1">
            {trip.title}
          </Typography>
        </Box>
      </Stack>
      <CardContent>
        <Stack spacing={2}>
          {author && (
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <UserAvatar user={author} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Организатор
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>{author.name}</Typography>
              </Box>
            </Stack>
          )}

          <Stack spacing={0.5} sx={{ color: 'text.secondary' }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <PlaceIcon fontSize="small" />
              <Typography variant="body2">
                {trip.destination}, {trip.country}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="body2">{formatDateRange(trip.startDate, trip.endDate)}</Typography>
            </Stack>
          </Stack>

          <Typography>{trip.description}</Typography>

          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {trip.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>

          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Участников: {trip.participantIds.length} из {trip.maxParticipants}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ≈ {formatMoney(Math.round(trip.plannedBudget / trip.maxParticipants))} на человека
              </Typography>
            </Box>
            <AvatarStack users={participants} />
          </Stack>

          <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Button component={RouterLink} to="/">
              Не сейчас
            </Button>
            {alreadyMember ? (
              <Button variant="contained" component={RouterLink} to={`/trips/${trip.id}`}>
                Вы уже участник — открыть
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<GroupAddIcon />}
                disabled={isFull}
                onClick={() => navigate(`/trips/${trip.id}`, { state: { joined: true } })}
              >
                {isFull ? 'Мест нет' : 'Присоединиться'}
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
