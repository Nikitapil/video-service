import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostLink } from '../../../router/routes.ts';
import { ImSpinner2 } from 'react-icons/im';
import { IProfilePost } from '../types.ts';

interface PostProfileProps {
  post: IProfilePost;
}

const PostProfile = ({ post }: PostProfileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  const onMouseEnter = () => {
    videoRef.current?.play();
  };

  const onMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <Link to={getPostLink(post.id)}>
      <div className="relative max-w-52 cursor-pointer brightness-90 hover:brightness-110">
        {loading && (
          <div className="absolute left-20 top-20">
            <ImSpinner2
              className="animate-spin"
              size="50"
            />
          </div>
        )}

        <video
          ref={videoRef}
          src={post.video}
          className="aspect-[3/4] rounded-md object-cover"
          muted
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onCanPlay={() => setLoading(false)}
        ></video>
        <div className="line-clamp-1 break-words px-1 pt-1 text-gray-700">{post.text}</div>
      </div>
    </Link>
  );
};

export default PostProfile;
