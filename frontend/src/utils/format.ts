import type { ExpenseCategory, TripStatus } from '../types';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });
const timeFormatter = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });
const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export function formatDateRange(start: string, end: string): string {
  const year = new Date(end).getFullYear();
  return `${dateFormatter.format(new Date(start))} — ${dateFormatter.format(new Date(end))} ${year}`;
}

export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

export function tripDays(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.round(ms / 86_400_000) + 1;
}

export const statusLabels: Record<TripStatus, string> = {
  recruiting: 'Набор участников',
  planning: 'Планирование',
  completed: 'Завершена',
};

export const statusColors: Record<TripStatus, 'success' | 'warning' | 'default'> = {
  recruiting: 'success',
  planning: 'warning',
  completed: 'default',
};

export const categoryLabels: Record<ExpenseCategory, string> = {
  transport: 'Транспорт',
  housing: 'Жильё',
  food: 'Еда',
  activities: 'Развлечения',
  other: 'Другое',
};

export function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
