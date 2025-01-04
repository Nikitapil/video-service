import { CommentType } from '../../../gql/graphql.tsx';
import PostCommentsListItem from './PostCommentsListItem.tsx';

interface PostCommentsListProps {
  comments: CommentType[];
  handleDeleteComment: (id: number) => void;
}

const PostCommentsList = ({ comments, handleDeleteComment }: PostCommentsListProps) => {
  if (!comments.length) {
    return (
      <h4
        className="mt-6 text-center text-xl text-gray-500"
        data-testid="not-found-text"
      >
        No comments...
      </h4>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-8 py-4">
      {comments.map((comment) => (
        <PostCommentsListItem
          key={comment.id}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
    </div>
  );
};

export default PostCommentsList;
