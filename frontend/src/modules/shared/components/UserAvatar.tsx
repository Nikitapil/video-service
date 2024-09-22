import { useMemo } from 'react';
import avatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

interface UserAvatarProps {
  image?: string | null;
  className?: string;
}

const UserAvatar = ({ image, className = '' }: UserAvatarProps) => {
  const userImageSrc = useMemo(() => image || avatarPlaceholder, [image]);

  return (
    <img
      src={userImageSrc}
      alt="avatar"
      className={`rounded-full w-8 ${className}`}
    />
  );
};

export default UserAvatar;
