import { useCallback } from 'react';
import { IoIosShareAlt } from 'react-icons/io';
import PostAction from './PostAction.tsx';

interface PostShareButtonProps {
  text: string;
}

const PostShareButton = ({ text }: PostShareButtonProps) => {
  const share = useCallback(() => {
    const shareData = {
      title: 'Video service',
      text: text,
      url: window.location.href
    };

    if (navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    }
  }, [text]);

  return (
    <PostAction
      buttonProps={{ Icon: IoIosShareAlt, onClick: share }}
      count={0}
      hideCount
    />
  );
};

export default PostShareButton;
