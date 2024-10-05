import IconButton, { IconButtonProps } from '../../../components/ui/IconButton.tsx';

interface PostActionProps {
  buttonProps: IconButtonProps;
  count: number;
}

const PostAction = ({ buttonProps, count }: PostActionProps) => {
  return (
    <div className="flex items-center gap-1">
      <IconButton {...buttonProps} />
      <span className="text-xs font-semibold text-gray-800">{count}</span>
    </div>
  );
};

export default PostAction;
