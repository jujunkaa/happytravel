import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import CreateTripPage from './pages/CreateTripPage';
import MyTripsPage from './pages/MyTripsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import JoinTripPage from './pages/JoinTripPage';
import TripPage from './pages/trip/TripPage';
import TripOverviewTab from './pages/trip/TripOverviewTab';
import TripPlanTab from './pages/trip/TripPlanTab';
import TripBudgetTab from './pages/trip/TripBudgetTab';
import TripChatTab from './pages/trip/TripChatTab';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout />}>
        <Route index element={<MyTripsPage />} />
        <Route path="trips/new" element={<CreateTripPage />} />
        <Route path="trips/:tripId" element={<TripPage />}>
          <Route index element={<TripOverviewTab />} />
          <Route path="plan" element={<TripPlanTab />} />
          <Route path="budget" element={<TripBudgetTab />} />
          <Route path="chat" element={<TripChatTab />} />
        </Route>
        <Route path="join/:code" element={<JoinTripPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
