import { PostType } from '../../../gql/graphql.ts';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { getProfileLink } from '../../../router/routes.ts';
import AppButton from '../../../components/ui/AppButton.tsx';
import { useFollows } from '../../shared/follows/useFollows.ts';
import PostHashTags from '../../shared/components/PostHashTags.tsx';
import PostAction from '../../shared/components/PostAction.tsx';
import { usePostLikes } from '../../shared/likes/usePostLikes.ts';

interface FeedPostProps {
  post: PostType;
  onTagClick: (tagValue: string) => void;
}

const FeedPost = ({ post, onTagClick }: FeedPostProps) => {
  const { onToggleFollow, isLoading, followButtonText } = useFollows(post.user);

  const { likesCount, isLiked, onLikeToggle } = usePostLikes(post);

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
            <PostAction
              buttonProps={{ Icon: AiFillHeart, iconColor: isLiked ? 'red' : 'black', onClick: onLikeToggle }}
              count={likesCount}
            />

            <div className="flex items-center gap-1">
              <button className="cursor-pointer rounded-full bg-gray-200 p-2">
                <IoIosShareAlt
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs font-semibold text-gray-800">34</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="cursor-pointer rounded-full bg-gray-200 p-2">
                <IoChatbubbleEllipses
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs font-semibold text-gray-800">0</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedPost;
