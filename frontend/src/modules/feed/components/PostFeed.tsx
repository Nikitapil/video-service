import { PostType } from '../../../gql/graphql.ts';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import tikTokLogoWhite from '../../../assets/images/tiktok-logo-white.png';
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
      <div className="pl-3 w-full px-4">
        <div className="flex items-center justify-between pb-0.5">
          <Link to={`/profile/${post.user.id}`}>
            <span className="font-bold hover:underline cursor-pointer">User name</span>
            <span className="text-[13px] text-gray-500 pl-1 cursor-pointer">{post.user.fullname}</span>
          </Link>
          <button className="border text-[15px] px-[21px] py-0.5 border-[#f02c56] text-[#f02c56] hover:bg-[#ffeef2] font-semibold rounded-md transition-all duration-300">
            Follow
          </button>
        </div>

        <div className="text-[15px] pb-0.5 break-words md:max-w-[480px] max-v-[300px]">{post.text}</div>

        <div className="text-[14px] text-gray-500 pb-0.5">#fun #cool #superAwesome</div>

        <div className="text-[14px] pb-0.5 flex items-center font-semibold">
          <BsMusicNoteBeamed size="17" />
          <div className="px-1">original - Awesome</div>
          <AiFillHeart size="20" />
        </div>

        <div className="mt-2.5 flex gap-4 flex-wrap">
          <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl">
            <video
              ref={video}
              src={`http://localhost:3000${post.video}`}
              loop
              muted
              controls
              autoPlay
              className="rounded-xl object-cover mx-auto h-full"
            ></video>

            <img
              src={tikTokLogoWhite}
              alt="tiktok logo"
              className="absolute right-2 bottom-14"
              width="90"
            />
          </div>

          <div className="self-end flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <AiFillHeart
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs text-gray-800 font-semibold">{post.likes?.length}</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <IoIosShareAlt
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs text-gray-800 font-semibold">34</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
                <IoChatbubbleEllipses
                  size="25"
                  color="black"
                />
              </button>
              <span className="text-xs text-gray-800 font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
