import { PostType } from '../../../gql/graphql.ts';
import { Link } from 'react-router-dom';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { getProfileLink } from '../../../router/routes.ts';
import AppButton from '../../../components/ui/AppButton.tsx';

interface FeedPostProps {
  post: PostType;
}

const FeedPost = ({ post }: FeedPostProps) => {
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

          <AppButton
            appearance="danger"
            text="Follow"
            size="sm"
          />
        </div>

        <div className="max-v-[300px] break-words pb-0.5 text-[15px] md:max-w-[480px]">{post.text}</div>

        <div className="pb-0.5 text-[14px] text-gray-500">#fun #cool #superAwesome</div>

        <div className="flex items-center pb-0.5 text-[14px] font-semibold">
          <BsMusicNoteBeamed size="17" />
          <div className="px-1">original - Awesome</div>
          <AiFillHeart size="20" />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-4">
          <div className="relative flex max-h-[580px] min-h-[480px] max-w-[260px] items-center rounded-xl bg-black">
            <video
              src={`http://localhost:3000${post.video}`}
              loop
              muted
              controls
              autoPlay
              className="mx-auto h-full rounded-xl object-cover"
            ></video>
          </div>

          <div className="flex items-center gap-2 self-end">
            <div className="flex items-center gap-1">
              <button className="cursor-pointer rounded-full bg-gray-200 p-2">
                <AiFillHeart
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs font-semibold text-gray-800">{post.likes?.length}</span>
            </div>

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
