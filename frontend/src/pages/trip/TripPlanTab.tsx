import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { planItems as initialPlan } from '../../data/mockData';
import type { PlanItem } from '../../types';
import { tripDays } from '../../utils/format';
import type { TripOutletContext } from './TripPage';
import EmptyState from '../../components/EmptyState';

export default function TripPlanTab() {
  const { trip, isMember } = useOutletContext<TripOutletContext>();
  const daysCount = tripDays(trip.startDate, trip.endDate);

  const [items, setItems] = useState<PlanItem[]>(initialPlan.filter((p) => p.tripId === trip.id));
  const [form, setForm] = useState({ day: 1, time: '10:00', title: '', place: '' });

  const toggleDone = (id: number) =>
    setItems((list) => list.map((p) => (p.id === id ? { ...p, done: !p.done } : p)));

  const addItem = () => {
    if (!form.title.trim()) return;
    setItems((list) => [...list, { id: Date.now(), tripId: trip.id, done: false, ...form }]);
    setForm({ ...form, title: '', place: '' });
  };

  const days = Array.from(new Set(items.map((i) => i.day))).sort((a, b) => a - b);

  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Программа поездки
          </Typography>
          {days.length === 0 && (
            <EmptyState title="План пока пуст" text="Добавьте первый пункт — например, перелёт или заселение." />
          )}
          {days.map((day, index) => (
            <Box key={day}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1, color: 'primary.dark' }}>
                День {day}
              </Typography>
              <List dense disablePadding>
                {items
                  .filter((i) => i.day === day)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item) => (
                    <ListItem key={item.id} disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Checkbox
                          edge="start"
                          checked={item.done}
                          onChange={() => toggleDone(item.id)}
                          disabled={!isMember}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item.time} — ${item.title}`}
                        secondary={item.place}
                        sx={{ textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.6 : 1 }}
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Добавить пункт
          </Typography>
          {!isMember ? (
            <Alert severity="info">Редактировать план могут только участники поездки.</Alert>
          ) : (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  select
                  label="День"
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
                  sx={{ flex: 1 }}
                >
                  {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => (
                    <MenuItem key={d} value={d}>
                      День {d}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="time"
                  label="Время"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  sx={{ flex: 1 }}
                />
              </Stack>
              <TextField
                label="Что делаем"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <TextField
                label="Где"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
              <Button variant="contained" startIcon={<AddIcon />} onClick={addItem} disabled={!form.title.trim()}>
                Добавить в план
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
