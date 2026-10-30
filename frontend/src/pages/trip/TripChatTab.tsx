import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Alert, Box, Card, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CURRENT_USER_ID, chatMessages, getUser } from '../../data/mockData';
import type { ChatMessage } from '../../types';
import { formatTime } from '../../utils/format';
import type { TripOutletContext } from './TripPage';
import UserAvatar from '../../components/UserAvatar';
import EmptyState from '../../components/EmptyState';

export default function TripChatTab() {
  const { trip, isMember } = useOutletContext<TripOutletContext>();
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages.filter((m) => m.tripId === trip.id));
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  const send = () => {
    if (!text.trim()) return;
    setMessages((list) => [
      ...list,
      { id: Date.now(), tripId: trip.id, authorId: CURRENT_USER_ID, text: text.trim(), sentAt: new Date().toISOString() },
    ]);
    setText('');
  };

  if (!isMember) {
    return <Alert severity="info">Чат доступен только участникам. Присоединитесь к поездке, чтобы общаться.</Alert>;
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: { xs: '60vh', md: 520 } }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: 'background.default' }}>
        {messages.length === 0 && <EmptyState title="Сообщений пока нет" text="Напишите первым!" />}
        <Stack spacing={1.5}>
          {messages.map((m) => {
            const author = getUser(m.authorId);
            const mine = m.authorId === CURRENT_USER_ID;
            return (
              <Stack
                key={m.id}
                direction={mine ? 'row-reverse' : 'row'}
                spacing={1}
                sx={{ alignItems: 'flex-end' }}
              >
                {author && <UserAvatar user={author} size={32} />}
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: { xs: '80%', md: '60%' },
                    bgcolor: mine ? 'primary.main' : 'background.paper',
                    color: mine ? 'primary.contrastText' : 'text.primary',
                    border: mine ? 'none' : 1,
                    borderColor: 'divider',
                  }}
                >
                  {!mine && (
                    <Typography variant="caption" sx={{ fontWeight: 700, display: 'block' }}>
                      {author?.name}
                    </Typography>
                  )}
                  <Typography variant="body2">{m.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', textAlign: 'right' }}>
                    {formatTime(m.sentAt)}
                  </Typography>
                </Paper>
              </Stack>
            );
          })}
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Stack
        component="form"
        direction="row"
        spacing={1}
        sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Сообщение…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton type="submit" color="primary" disabled={!text.trim()} aria-label="Отправить">
          <SendIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
