import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Trip } from '../types';
import { formatDateRange } from '../utils/format';
import TripScene from './TripScene';

const circleSize = { xs: 128, sm: 160, md: 180 };
const itemWidth = { xs: 150, sm: 190, md: 220 };

const circleSx = {
  width: circleSize,
  height: circleSize,
  borderRadius: '50%',
  border: '6px solid #FFFFFF',
  boxShadow: '0 10px 24px rgba(79, 107, 60, 0.16)',
  overflow: 'hidden',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const itemSx = {
  width: itemWidth,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover .circle, &:focus-visible .circle': {
    transform: 'translateY(-4px) scale(1.04)',
    boxShadow: '0 16px 32px rgba(79, 107, 60, 0.26)',
  },
};

const titleSx = { mt: 1.5, fontWeight: 700, lineHeight: 1.3, color: 'primary.dark' };

export default function TripCircle({ trip }: { trip: Trip }) {
  const completed = trip.status === 'completed';

  return (
    <Box component={RouterLink} to={`/trips/${trip.id}`} sx={itemSx}>
      <Box className="circle" sx={{ ...circleSx, filter: completed ? 'grayscale(0.6)' : 'none' }}>
        <TripScene scene={trip.scene} />
      </Box>
      <Typography variant="subtitle1" component="h3" sx={titleSx}>
        {trip.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDateRange(trip.startDate, trip.endDate)}
      </Typography>
    </Box>
  );
}

interface ActionCircleProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

function ActionCircleContent({ icon, title, subtitle, color }: ActionCircleProps) {
  return (
    <>
      <Box
        className="circle"
        sx={{
          ...circleSx,
          border: '3px dashed',
          borderColor: 'primary.dark',
          bgcolor: color,
          color: 'primary.dark',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography variant="subtitle1" component="h3" sx={titleSx}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </>
  );
}

export function NewTripCircle() {
  return (
    <Box component={RouterLink} to="/trips/new" sx={itemSx}>
      <ActionCircleContent
        icon={<AddIcon sx={{ fontSize: 56 }} />}
        title="Новая поездка"
        subtitle="Создать и пригласить друзей"
        color="#F8D9DC"
      />
    </Box>
  );
}
