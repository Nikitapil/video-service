import { CommentType } from '../../../gql/graphql.tsx';
import { Link } from 'react-router-dom';
import { getProfileLink } from '../../../router/routes.ts';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { formatDate } from '../../../utils/dates.ts';
import IconButton from '../../../components/ui/IconButton.tsx';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import ConfirmModal from '../../../components/ux/ConfirmModal.tsx';

interface PostCommentsListItemProps {
  comment: CommentType;
  handleDeleteComment: (id: number) => void;
}

const PostCommentsListItem = ({ comment, handleDeleteComment }: PostCommentsListItemProps) => {
  const deleteCommentModal = useShowElement();

  return (
    <div
      className="relative flex w-full items-center gap-3"
      key={comment.id}
    >
      <Link
        to={getProfileLink(comment.user.id)}
        className="self-start"
      >
        <UserAvatar
          image={comment.user.image}
          className="w-10"
        />
      </Link>

      <div className="w-full pt-0.5">
        <h3 className="text-xs font-semibold">{comment.user.fullname}</h3>

        <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>

        <p className="font-light">{comment.text}</p>
      </div>

      {comment.canDelete && (
        <IconButton
          Icon={MdOutlineDeleteForever}
          data-testid="delete-comment"
          onClick={deleteCommentModal.open}
        />
      )}

      <ConfirmModal
        showElement={deleteCommentModal}
        title="Are you sure you want to delete this comment?"
        onConfirm={() => handleDeleteComment(comment.id)}
      />
    </div>
  );
};

export default PostCommentsListItem;
