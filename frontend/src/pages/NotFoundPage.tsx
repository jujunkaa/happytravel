import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
import EmptyState from '../components/EmptyState';

export default function NotFoundPage() {
  return (
    <EmptyState
      title="404 — страница не найдена"
      text="Возможно, поездку удалили или ссылка введена с ошибкой."
      action={
        <Button component={RouterLink} to="/" variant="contained">
          К моим поездкам
        </Button>
      }
    />
  );
}
