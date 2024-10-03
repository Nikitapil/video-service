import { User, useToggleUserFollowMutation } from '../../../gql/graphql.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useFollows = (user: User) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

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

  useEffect(() => {
    setIsFollowed(!!user.isFollowed);
  }, [user.isFollowed]);

  return { onToggleFollow, isLoading, followButtonText };
};
