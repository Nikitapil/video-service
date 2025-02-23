import AppButton from '../../../../components/ui/AppButton.tsx';
import { User, UserProfileType, useToggleUserFollowMutation } from '../../../../gql/graphql.tsx';
import { useCallback, useMemo, useState } from 'react';

interface FollowButtonProps {
  user: User | Omit<UserProfileType, 'posts'>;
}

const FollowButton = ({ user }: FollowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(!!user.isFollowed);

  const [toggleFollow] = useToggleUserFollowMutation();

  const followButtonText = useMemo(() => {
    return isFollowed ? 'Unfollow' : 'Follow';
  }, [isFollowed]);

  const onToggleFollow = useCallback(async () => {
    setIsLoading(true);
    const { data } = await toggleFollow({
      variables: { userToFollowId: user.id }
    });
    setIsFollowed(!!data?.toggleUserFollow?.isFollowed);
    setIsLoading(false);
  }, [toggleFollow, user]);

  if (!user.canFollow) {
    return null;
  }

  return (
    <AppButton
      appearance="danger"
      isLoading={isLoading}
      text={followButtonText}
      size="sm"
      onClick={onToggleFollow}
    />
  );
};

export default FollowButton;
