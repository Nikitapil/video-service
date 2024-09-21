import { PostType } from '../gql/graphql.ts';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsFillBarChartFill } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';

const PostProfile = ({ post }: { post: PostType }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onMouseEnter = () => {
    videoRef.current?.play();
  };

  const onMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <Link to={`/post/${post.id}`}>
      <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
        <video
          ref={videoRef}
          src={`http://localhost:3000${post.video}`}
          className="aspect-[3/4] object-cover rounded-md"
          muted
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        ></video>
        <div className="px-1 text-gray-700 text-[15px] pt-1 break-words">{post.text}</div>
        <div className="flex gap-2 items-center text-gray-600 font-bold text-xs">
          <BsFillBarChartFill
            className="ml-1"
            size="16"
          />
          <div>3%</div>
          <FiAlertCircle size="20" />
        </div>
      </div>
    </Link>
  );
};

export default PostProfile;
