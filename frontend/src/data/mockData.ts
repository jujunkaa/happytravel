import type { ChatMessage, Expense, PlanItem, Trip, User } from '../types';

export const CURRENT_USER_ID = 1;

export const users: User[] = [
  { id: 1, name: 'Юлия Мухина', city: 'Москва', about: 'Люблю гулять и зеленый чай', avatarColor: '#7E9C63' },
  { id: 2, name: 'Дмитрий Яценко', city: 'Санкт-Петербург', about: 'Фотограф, ищу компанию для поездок на машине.', avatarColor: '#4A6C8F' },
  { id: 3, name: 'Светлана Орлова', city: 'Казань', about: 'Гастротуры и музеи.', avatarColor: '#8C5A3C' },
  { id: 4, name: 'Кристина Калашникова', city: 'Москва', about: 'Сплавы, палатки, костры.', avatarColor: '#4F5D52' },
  { id: 5, name: 'Анастасия Лебедева', city: 'Екатеринбург', about: 'Путешествую бюджетно.', avatarColor: '#9A4458' },
  { id: 6, name: 'Сергей Орлов', city: 'Новосибирск', about: 'Байкал — моя любовь.', avatarColor: '#5B4B6B' },
];

export const trips: Trip[] = [
  {
    id: 1,
    title: 'Тусим в Минске',
    destination: 'Минск',
    country: 'Беларусь',
    description:
      'Длинные выходные в Минске: Верхний город, Троицкое предместье, бары на Зыбицкой и драники на завтрак. Едем на поезде, живём в квартире в центре.',
    startDate: '2026-12-11',
    endDate: '2026-12-14',
    maxParticipants: 5,
    plannedBudget: 150000,
    tags: ['Город', 'Еда'],
    status: 'planning',
    authorId: 3,
    participantIds: [3, 1, 5, 4],
    scene: 'old-town',
    inviteCode: 'MINSK',
  },
  {
    id: 2,
    title: 'Москва слезам не верит',
    destination: 'Москва',
    country: 'Россия',
    description:
      'Неделя в Москве для тех, кто давно собирался: Красная площадь, ВДНХ, прогулка на теплоходе по реке, театр и гастрономические места. Темп спокойный.',
    startDate: '2027-01-15',
    endDate: '2027-01-20',
    maxParticipants: 4,
    plannedBudget: 200000,
    tags: ['Город', 'Культура'],
    status: 'recruiting',
    authorId: 1,
    participantIds: [1, 2],
    scene: 'big-city',
    inviteCode: 'MOSCOW',
  },
  {
    id: 3,
    title: 'Добро пожаловать в Воркуту',
    destination: 'Воркута',
    country: 'Россия',
    description:
      'Настоящий Север: тундра, северное сияние, заброшенные посёлки и катание на снегоходах. Берём самую тёплую одежду.',
    startDate: '2027-02-20',
    endDate: '2027-02-25',
    maxParticipants: 6,
    plannedBudget: 270000,
    tags: ['Природа', 'Зима', 'Фото'],
    status: 'recruiting',
    authorId: 6,
    participantIds: [6, 1, 2],
    scene: 'frozen-lake',
    inviteCode: 'VORKUTA',
  },
  {
    id: 4,
    title: 'Япония',
    destination: 'Токио, Киото, Осака',
    country: 'Япония',
    description:
      'Две недели в сезон цветения сакуры: Токио, храмы Киото, олени в Наре и уличная еда в Осаке. Перемещаемся по JR Pass.',
    startDate: '2027-04-01',
    endDate: '2027-04-14',
    maxParticipants: 4,
    plannedBudget: 1200000,
    tags: ['Город', 'Культура', 'Еда'],
    status: 'recruiting',
    authorId: 5,
    participantIds: [5, 1],
    scene: 'japan',
    inviteCode: 'JAPAN',
  },
];

export const planItems: PlanItem[] = [
  { id: 1, tripId: 1, day: 1, time: '08:00', title: 'Поезд Москва — Минск', place: 'Белорусский вокзал', done: true },
  { id: 2, tripId: 1, day: 1, time: '18:00', title: 'Заселение и ужин с драниками', place: 'Центр', done: false },
  { id: 3, tripId: 1, day: 2, time: '11:00', title: 'Верхний город и Троицкое предместье', place: 'Немига', done: false },
  { id: 4, tripId: 1, day: 2, time: '21:00', title: 'Бары на Зыбицкой', place: 'Зыбицкая', done: false },
  { id: 5, tripId: 1, day: 3, time: '12:00', title: 'Парк Горького и проспект Независимости', place: 'Центр', done: false },
  { id: 6, tripId: 2, day: 1, time: '12:00', title: 'Красная площадь и ГУМ', place: 'Китай-город', done: false },
  { id: 7, tripId: 2, day: 2, time: '11:00', title: 'ВДНХ и Останкино', place: 'ВДНХ', done: false },
  { id: 8, tripId: 2, day: 3, time: '19:00', title: 'Теплоход по Москве-реке', place: 'Парк Горького', done: false },
  { id: 9, tripId: 3, day: 1, time: '10:00', title: 'Прилёт, заселение, тёплая одежда', place: 'Воркута', done: false },
  { id: 10, tripId: 3, day: 2, time: '22:00', title: 'Охота за северным сиянием', place: 'Тундра', done: false },
  { id: 11, tripId: 4, day: 1, time: '15:00', title: 'Прилёт, заселение в Синдзюку', place: 'Токио', done: false },
  { id: 12, tripId: 4, day: 3, time: '09:00', title: 'Ханами в парке Уэно', place: 'Токио', done: false },
];

export const expenses: Expense[] = [
  { id: 1, tripId: 1, title: 'Билеты на поезд', amount: 48000, category: 'transport', paidById: 3 },
  { id: 2, tripId: 1, title: 'Квартира, 3 ночи', amount: 36000, category: 'housing', paidById: 1 },
  { id: 3, tripId: 1, title: 'Ужин в первый вечер', amount: 9500, category: 'food', paidById: 5 },
  { id: 4, tripId: 1, title: 'Экскурсия по Верхнему городу', amount: 8000, category: 'activities', paidById: 4 },
  { id: 5, tripId: 2, title: 'Билеты в театр', amount: 24000, category: 'activities', paidById: 1 },
  { id: 6, tripId: 3, title: 'Бронь гостиницы', amount: 42000, category: 'housing', paidById: 6 },
  { id: 7, tripId: 3, title: 'Снегоходы', amount: 30000, category: 'activities', paidById: 2 },
  { id: 8, tripId: 4, title: 'Авиабилеты', amount: 360000, category: 'transport', paidById: 5 },
];

export const chatMessages: ChatMessage[] = [
  { id: 1, tripId: 1, authorId: 3, text: 'Всем привет! Билеты на поезд купила, скинула в бюджет.', sentAt: '2026-10-18T10:12:00' },
  { id: 2, tripId: 1, authorId: 1, text: 'Квартиру в центре тоже забронировала 🙌', sentAt: '2026-10-18T10:40:00' },
  { id: 3, tripId: 1, authorId: 5, text: 'Предлагаю во второй вечер сходить на Зыбицкую.', sentAt: '2026-10-19T19:05:00' },
  { id: 4, tripId: 1, authorId: 4, text: 'Поддерживаю! И экскурсию по Верхнему городу.', sentAt: '2026-10-19T19:22:00' },
  { id: 5, tripId: 3, authorId: 6, text: 'Добро пожаловать в Воркуту! Тёплые носки — обязательно.', sentAt: '2026-10-20T08:00:00' },
  { id: 6, tripId: 3, authorId: 2, text: 'Возьму штатив для съёмки сияния 📷', sentAt: '2026-10-20T09:15:00' },
  { id: 7, tripId: 4, authorId: 5, text: 'Билеты в Токио взяла, ждём сакуру 🌸', sentAt: '2026-10-21T12:00:00' },
];

export const getUser = (id: number): User | undefined => users.find((u) => u.id === id);

export const getTrip = (id: number): Trip | undefined => trips.find((t) => t.id === id);

export const getTripByInviteCode = (code: string): Trip | undefined =>
  trips.find((t) => t.inviteCode.toLowerCase() === code.trim().toLowerCase());

export function completeTrip(id: number): void {
  const trip = getTrip(id);
  if (trip) trip.status = 'completed';
}

export function deleteTrip(id: number): void {
  const index = trips.findIndex((t) => t.id === id);
  if (index !== -1) trips.splice(index, 1);
}
