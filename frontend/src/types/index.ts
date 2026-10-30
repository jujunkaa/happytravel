export interface User {
  id: number;
  name: string;
  city: string;
  about: string;
  avatarColor: string;
}

export type TripSceneName =
  | 'frozen-lake'
  | 'big-city'
  | 'japan'
  | 'city'
  | 'forest-lake'
  | 'mountains'
  | 'old-town'
  | 'river';

export type TripStatus = 'recruiting' | 'planning' | 'completed';

export interface Trip {
  id: number;
  title: string;
  destination: string;
  country: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  plannedBudget: number;
  tags: string[];
  status: TripStatus;
  authorId: number;
  participantIds: number[];
  scene: TripSceneName;
  inviteCode: string;
}

export interface PlanItem {
  id: number;
  tripId: number;
  day: number;
  time: string;
  title: string;
  place: string;
  done: boolean;
}

export type ExpenseCategory = 'transport' | 'housing' | 'food' | 'activities' | 'other';

export interface Expense {
  id: number;
  tripId: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  paidById: number;
}

export interface ChatMessage {
  id: number;
  tripId: number;
  authorId: number;
  text: string;
  sentAt: string;
}
