import { PostType } from '../../../gql/graphql.ts';
import { Link, useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { getPostLink, getProfileLink } from '../../../router/routes.ts';
import AppButton from '../../../components/ui/AppButton.tsx';
import { useFollows } from '../../shared/follows/useFollows.ts';
import PostHashTags from '../../shared/components/PostHashTags.tsx';
import PostAction from '../../shared/components/PostAction.tsx';
import { useCallback } from 'react';
import LikeButton from '../../shared/likes/components/LikeButton.tsx';
import PostShareButton from '../../shared/components/PostShareButton.tsx';

interface FeedPostProps {
  post: PostType;
  onTagClick: (tagValue: string) => void;
}

const FeedPost = ({ post, onTagClick }: FeedPostProps) => {
  const navigate = useNavigate();

  const { onToggleFollow, isLoading, followButtonText } = useFollows(post.user);

  const goToPost = useCallback(() => {
    navigate(getPostLink(post.id));
  }, [navigate, post.id]);

  return (
    <article className="flex border-b py-6">
      <Link
        to={getProfileLink(post.user.id)}
        className="self-start"
      >
        <UserAvatar
          image={post.user.image}
          className="lg:w-14"
        />
      </Link>

      <div className="w-full px-4">
        <div className="flex items-center justify-between pb-0.5">
          <Link to={getProfileLink(post.user.id)}>
            <span className="cursor-pointer font-bold hover:underline">{post.user.fullname}</span>
          </Link>

          {post.user.canFollow && (
            <AppButton
              appearance="danger"
              isLoading={isLoading}
              text={followButtonText}
              size="sm"
              onClick={onToggleFollow}
            />
          )}
        </div>

        <div className="max-w-md break-words pb-0.5 text-sm">{post.text}</div>

        <div className="mb-0.5">
          <PostHashTags
            tags={post.tags || []}
            onTagClick={onTagClick}
          />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-4">
          <div className="max-h-140 min-h-120 max-w-72 rounded-xl bg-black">
            <video
              src={`${import.meta.env.VITE_APP_BACKEND_BASE_URL}${post.video}`}
              loop
              muted
              controls
              autoPlay
              className="mx-auto h-full rounded-xl object-cover"
            ></video>
          </div>

          <div className="flex items-center gap-2 self-end">
            <LikeButton post={post} />

            <PostShareButton text={post.text} />

            <PostAction
              buttonProps={{ Icon: IoChatbubbleEllipses, onClick: goToPost }}
              count={post.commentsCount || 0}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedPost;
