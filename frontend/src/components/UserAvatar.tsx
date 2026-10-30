import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import type { User } from '../types';
import { initials } from '../utils/format';

interface UserAvatarProps {
  user: User;
  size?: number;
  showTooltip?: boolean;
}

export default function UserAvatar({ user, size = 40, showTooltip = true }: UserAvatarProps) {
  const avatar = (
    <Avatar sx={{ bgcolor: user.avatarColor, width: size, height: size, fontSize: size * 0.4 }}>
      {initials(user.name)}
    </Avatar>
  );
  return showTooltip ? <Tooltip title={user.name}>{avatar}</Tooltip> : avatar;
}

interface AvatarStackProps {
  users: User[];
  max?: number;
  size?: number;
}

export function AvatarStack({ users, max = 4, size = 30 }: AvatarStackProps) {
  return (
    <AvatarGroup max={max} sx={{ '& .MuiAvatar-root': { width: size, height: size, fontSize: size * 0.4 } }}>
      {users.map((u) => (
        <UserAvatar key={u.id} user={u} size={size} />
      ))}
    </AvatarGroup>
  );
}
