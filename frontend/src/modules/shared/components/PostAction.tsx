import IconButton, { IconButtonProps } from '../../../components/ui/IconButton.tsx';

interface PostActionProps {
  buttonProps: IconButtonProps & { ['data-testid']?: string };
  count: number;
  hideCount?: boolean;
}

const PostAction = ({ buttonProps, count, hideCount = false }: PostActionProps) => {
  return (
    <div className="flex items-center gap-1">
      <IconButton {...buttonProps} />
      {!hideCount && (
        <span
          className="text-xs font-semibold text-gray-800"
          data-testid="action-count"
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default PostAction;
