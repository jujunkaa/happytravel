import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import IslandIcon from '../components/IslandIcon';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #F8D9DC 0%, #F6F8EF 50%, #BFD3A8 100%)',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420 }} variant="elevation" elevation={6}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={1} sx={{ alignItems: 'center', mb: 2, color: 'primary.dark' }}>
            <IslandIcon size={64} color="#4F6B3C" />
            <Typography variant="h5" color="text.primary">
              happytravel
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Находите попутчиков и планируйте поездки вместе
            </Typography>
          </Stack>

          <Tabs value={mode} onChange={(_, v) => setMode(v)} variant="fullWidth" sx={{ mb: 2 }}>
            <Tab value="login" label="Вход" />
            <Tab value="register" label="Регистрация" />
          </Tabs>

          <Stack
            component="form"
            spacing={2}
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            {mode === 'register' && <TextField label="Имя" autoComplete="name" />}
            <TextField label="Email" type="email" autoComplete="email" />
            <TextField label="Пароль" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            <Button type="submit" variant="contained" size="large">
              {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
