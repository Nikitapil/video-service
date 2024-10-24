import { AiFillHeart } from 'react-icons/ai';
import PostAction from '../../components/PostAction.tsx';
import { useCallback, useState } from 'react';
import { PostType, useLikePostMutation } from '../../../../gql/graphql.tsx';

interface LikeButtonProps {
  post: Pick<PostType, 'id' | 'isLiked' | 'likesCount'>;
}

const LikeButton = ({ post }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(!!post.isLiked || false);
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

  return (
    <PostAction
      buttonProps={{ Icon: AiFillHeart, iconColor: isLiked ? 'red' : 'black', onClick: onLikeToggle }}
      count={likesCount}
    />
  );
};

export default LikeButton;
