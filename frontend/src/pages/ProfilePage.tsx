import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import UserAvatar from '../components/UserAvatar';
import { CURRENT_USER_ID, getUser, trips } from '../data/mockData';

export default function ProfilePage() {
  const me = getUser(CURRENT_USER_ID)!;
  const [form, setForm] = useState({ name: me.name, city: me.city, about: me.about });
  const [saved, setSaved] = useState(false);

  const myTrips = trips.filter((t) => t.participantIds.includes(me.id));
  const stats = [
    { label: 'Поездок', value: myTrips.length },
    { label: 'Организовано', value: trips.filter((t) => t.authorId === me.id).length },
    { label: 'Завершено', value: myTrips.filter((t) => t.status === 'completed').length },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, alignItems: 'start' }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <UserAvatar user={{ ...me, name: form.name || me.name }} size={96} />
          </Box>
          <Typography variant="h5">{form.name}</Typography>
          <Typography color="text.secondary">{form.city}</Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" sx={{ justifyContent: 'space-around' }}>
            {stats.map((s) => (
              <Box key={s.label}>
                <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Button component={RouterLink} to="/login" startIcon={<LogoutIcon />} color="inherit">
            Выйти
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Личные данные
          </Typography>
          <Stack
            component="form"
            spacing={2}
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <TextField label="Имя и фамилия" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Город" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <TextField
              label="О себе"
              multiline
              minRows={3}
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
            <Box>
              <Button type="submit" variant="contained">
                Сохранить
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
          Профиль сохранён (демо-режим)
        </Alert>
      </Snackbar>
    </Box>
  );
}
