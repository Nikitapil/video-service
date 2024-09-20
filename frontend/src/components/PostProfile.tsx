import {PostType} from "../gql/graphql.ts";
import {useRef} from "react";

const PostProfile = ({ post }: { post:PostType }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onMouseEnter = () => {
    console.log('here')
    videoRef.current?.play();
  }

  const onMouseLeave = () => {
    videoRef.current?.pause();
  }

  return (
    <div>
      <video
        className="cursor-pointer"
        ref={videoRef}
        src={`http://localhost:3000${post.video}`}
        muted
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      ></video>
    </div>
  );
};

export default PostProfile;