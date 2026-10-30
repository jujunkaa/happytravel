import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CURRENT_USER_ID, expenses as initialExpenses, getUser } from '../../data/mockData';
import type { Expense, ExpenseCategory } from '../../types';
import { categoryLabels, formatMoney } from '../../utils/format';
import type { TripOutletContext } from './TripPage';
import UserAvatar from '../../components/UserAvatar';

export default function TripBudgetTab() {
  const { trip, participants, isMember } = useOutletContext<TripOutletContext>();
  const [items, setItems] = useState<Expense[]>(initialExpenses.filter((e) => e.tripId === trip.id));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', category: 'food' as ExpenseCategory });

  const spent = items.reduce((sum, e) => sum + e.amount, 0);
  const progress = Math.min(100, Math.round((spent / trip.plannedBudget) * 100));
  const share = participants.length ? spent / participants.length : 0;

  const byCategory = (Object.keys(categoryLabels) as ExpenseCategory[])
    .map((cat) => ({ cat, total: items.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0) }))
    .filter((c) => c.total > 0);

  const balances = participants.map((u) => {
    const paid = items.filter((e) => e.paidById === u.id).reduce((s, e) => s + e.amount, 0);
    return { user: u, paid, balance: paid - share };
  });

  const addExpense = () => {
    const amount = Number(form.amount);
    if (!form.title.trim() || !amount) return;
    setItems((list) => [
      ...list,
      { id: Date.now(), tripId: trip.id, title: form.title, amount, category: form.category, paidById: CURRENT_USER_ID },
    ]);
    setForm({ title: '', amount: '', category: 'food' });
    setDialogOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' } }}>
        {[
          { label: 'Запланировано', value: formatMoney(trip.plannedBudget) },
          { label: 'Потрачено', value: formatMoney(spent) },
          { label: 'Доля на участника', value: formatMoney(Math.round(share)) },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {s.label}
              </Typography>
              <Typography variant="h5">{s.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Использовано бюджета
            </Typography>
            <Typography>{progress}%</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress > 90 ? 'error' : 'primary'}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {byCategory.map((c) => (
              <Typography key={c.cat} variant="body2" color="text.secondary">
                {categoryLabels[c.cat]}: <b>{formatMoney(c.total)}</b>
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
        <Card>
          <CardContent>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6">Расходы</Typography>
              {isMember && (
                <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={() => setDialogOpen(true)}>
                  Добавить
                </Button>
              )}
            </Stack>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Статья</TableCell>
                    <TableCell>Категория</TableCell>
                    <TableCell>Оплатил</TableCell>
                    <TableCell align="right">Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.title}</TableCell>
                      <TableCell>{categoryLabels[e.category]}</TableCell>
                      <TableCell>{getUser(e.paidById)?.name.split(' ')[0]}</TableCell>
                      <TableCell align="right">{formatMoney(e.amount)}</TableCell>
                    </TableRow>
                  ))}
                  {items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ color: 'text.secondary' }}>
                        Расходов пока нет
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Кто кому должен
            </Typography>
            <Stack spacing={1.5}>
              {balances.map(({ user, paid, balance }) => (
                <Stack key={user.id} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <UserAvatar user={user} size={32} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2">{user.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Оплатил(а) {formatMoney(paid)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600 }}
                    color={balance >= 0 ? 'success.main' : 'error.main'}
                  >
                    {balance >= 0 ? '+' : '−'}
                    {formatMoney(Math.abs(Math.round(balance)))}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Новый расход</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Статья расхода"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
            <TextField
              label="Сумма, ₽"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <TextField
              select
              label="Категория"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as ExpenseCategory })}
            >
              {(Object.keys(categoryLabels) as ExpenseCategory[]).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {categoryLabels[cat]}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={addExpense}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
