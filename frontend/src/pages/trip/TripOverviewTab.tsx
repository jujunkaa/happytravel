import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import UserAvatar from '../../components/UserAvatar';
import type { TripOutletContext } from './TripPage';
import { formatMoney } from '../../utils/format';

export default function TripOverviewTab() {
  const { trip, participants } = useOutletContext<TripOutletContext>();
  const perPerson = Math.round(trip.plannedBudget / trip.maxParticipants);

  const facts = [
    { label: 'Общий бюджет', value: formatMoney(trip.plannedBudget) },
    { label: 'На человека', value: `≈ ${formatMoney(perPerson)}` },
    { label: 'Свободных мест', value: String(trip.maxParticipants - trip.participantIds.length) },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            О поездке
          </Typography>
          <Typography sx={{ mb: 2, lineHeight: 1.7 }}>{trip.description}</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {trip.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
            {facts.map((f) => (
              <Box key={f.label} sx={{ bgcolor: 'background.default', borderRadius: 2, p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {f.label}
                </Typography>
                <Typography variant="h6">{f.value}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Участники</Typography>
          <List dense>
            {participants.map((u) => (
              <ListItem key={u.id} disableGutters>
                <ListItemAvatar>
                  <UserAvatar user={u} />
                </ListItemAvatar>
                <ListItemText
                  primary={u.name}
                  secondary={u.id === trip.authorId ? `Организатор · ${u.city}` : u.city}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
