import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { formatMoney } from '../utils/format';
import ScenePicker from '../components/ScenePicker';
import TripScene from '../components/TripScene';
import type { TripSceneName } from '../types';

const tagOptions = ['Природа', 'Горы', 'Город', 'Еда', 'Культура', 'Автотур', 'Треккинг', 'Сплав', 'Пляж', 'Зима', 'Фото'];

interface TripForm {
  title: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  plannedBudget: string;
  description: string;
  tags: string[];
  scene: TripSceneName;
}

const emptyForm: TripForm = {
  title: '',
  destination: '',
  country: '',
  startDate: '',
  endDate: '',
  maxParticipants: 4,
  plannedBudget: '',
  description: '',
  tags: [],
  scene: 'mountains',
};

export default function CreateTripPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<TripForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [published, setPublished] = useState(false);

  const update = <K extends keyof TripForm>(key: K, value: TripForm[K]) => setForm((f) => ({ ...f, [key]: value }));

  const errors = {
    title: !form.title.trim() ? 'Укажите название' : '',
    destination: !form.destination.trim() ? 'Укажите, куда едем' : '',
    startDate: !form.startDate ? 'Выберите дату' : '',
    endDate: !form.endDate
      ? 'Выберите дату'
      : form.startDate && form.endDate < form.startDate
        ? 'Окончание раньше начала'
        : '',
    description: form.description.trim().length < 20 ? 'Минимум 20 символов' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const budget = Number(form.plannedBudget) || 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!hasErrors) setPublished(true);
  };

  const err = (key: keyof typeof errors) => (submitted ? errors[key] : '');

  if (published) {
    return (
      <Card sx={{ maxWidth: 640, mx: 'auto' }}>
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 2, borderRadius: '50%', border: '5px solid #FFFFFF', boxShadow: '0 10px 24px rgba(79, 107, 60, 0.16)', overflow: 'hidden' }}>
            <TripScene scene={form.scene} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Поездка создана! 🎉
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            «{form.title}» сохранится, когда будет подключён сервер. Сейчас это демонстрационный режим.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => navigate('/')}>
              К моим поездкам
            </Button>
            <Button
              onClick={() => {
                setForm(emptyForm);
                setSubmitted(false);
                setPublished(false);
              }}
            >
              Создать ещё одну
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Новая поездка
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Опишите поездку — после создания вы получите ссылку-приглашение для друзей.
      </Typography>

      <Card>
        <CardContent component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            {submitted && hasErrors && <Alert severity="error">Проверьте поля, отмеченные красным.</Alert>}

            <TextField
              label="Название"
              placeholder="Например: Выходные в Калининграде"
              required
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              error={Boolean(err('title'))}
              helperText={err('title')}
            />

            <ScenePicker value={form.scene} onChange={(scene) => update('scene', scene)} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Куда"
                required
                fullWidth
                value={form.destination}
                onChange={(e) => update('destination', e.target.value)}
                error={Boolean(err('destination'))}
                helperText={err('destination')}
              />
              <TextField
                label="Страна"
                fullWidth
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Дата начала"
                type="date"
                required
                fullWidth
                value={form.startDate}
                onChange={(e) => update('startDate', e.target.value)}
                error={Boolean(err('startDate'))}
                helperText={err('startDate')}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Дата окончания"
                type="date"
                required
                fullWidth
                value={form.endDate}
                onChange={(e) => update('endDate', e.target.value)}
                error={Boolean(err('endDate'))}
                helperText={err('endDate')}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>

            <Box>
              <Typography gutterBottom>Максимум участников: {form.maxParticipants}</Typography>
              <Slider
                value={form.maxParticipants}
                onChange={(_, v) => update('maxParticipants', v as number)}
                min={2}
                max={12}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Box>

            <TextField
              label="Планируемый бюджет на всю группу"
              type="number"
              value={form.plannedBudget}
              onChange={(e) => update('plannedBudget', e.target.value)}
              helperText={budget > 0 ? `≈ ${formatMoney(Math.round(budget / form.maxParticipants))} на человека` : ' '}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">₽</InputAdornment> } }}
            />

            <Autocomplete
              multiple
              freeSolo
              options={tagOptions}
              value={form.tags}
              onChange={(_, value) => update('tags', value)}
              renderInput={(params) => <TextField {...params} label="Теги" placeholder="Выберите или введите" />}
            />

            <TextField
              label="Описание"
              required
              multiline
              minRows={4}
              placeholder="Что планируете посмотреть, какой темп, кого ищете в компанию…"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              error={Boolean(err('description'))}
              helperText={err('description') || `${form.description.length} символов`}
            />

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate(-1)}>Отмена</Button>
              <Button type="submit" variant="contained" size="large">
                Создать поездку
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
