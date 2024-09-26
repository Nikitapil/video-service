import { PostType } from '../../../gql/graphql.ts';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import UserAvatar from '../../shared/components/UserAvatar.tsx';

const PostFeed = ({ post }: { post: PostType }) => {
  const video = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="flex border-b py-6">
      <div className="cursor-pointer">
        <UserAvatar
          image={post.user.image}
          className="lg:w-14"
        />
      </div>
      <div className="w-full px-4 pl-3">
        <div className="flex items-center justify-between pb-0.5">
          <Link to={`/profile/${post.user.id}`}>
            <span className="cursor-pointer font-bold hover:underline">User name</span>
            <span className="cursor-pointer pl-1 text-[13px] text-gray-500">{post.user.fullname}</span>
          </Link>
          <button className="rounded-md border border-[#f02c56] px-[21px] py-0.5 text-[15px] font-semibold text-[#f02c56] transition-all duration-300 hover:bg-[#ffeef2]">
            Follow
          </button>
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
              ref={video}
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
    </div>
  );
};

export default PostFeed;
