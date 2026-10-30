import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  text?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, px: 2, color: 'text.secondary' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {text && <Typography sx={{ mb: 2 }}>{text}</Typography>}
      {action}
    </Box>
  );
}
