import { PostType, useLikePostMutation } from '../../../gql/graphql.tsx';
import { useCallback, useState } from 'react';

export const usePostLikes = (post: PostType) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  const [toggleLike] = useLikePostMutation({
    variables: {
      postId: post.id
    }
  });

  const onLikeToggle = useCallback(async () => {
    const { data } = await toggleLike();
    const isLiked = !!data?.toggleLikePost.isLiked;
    setIsLiked(isLiked);
    setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
  }, [toggleLike]);

  return { likesCount, isLiked, onLikeToggle };
};
