import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ImCross, ImSpinner2 } from 'react-icons/im';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import LikeButton from '../../shared/likes/components/LikeButton.tsx';
import PostShareButton from '../../shared/components/PostShareButton.tsx';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useGetCommentsByPostIdQuery,
  useGetPostByIdQuery
} from '../../../gql/graphql.tsx';
import { getPostLink, getProfileLink, RoutesEnum } from '../../../router/routes.ts';

import styles from './post.module.scss';
import { formatDate } from '../../../utils/dates.ts';
import ConfirmModal from '../../../components/ux/ConfirmModal.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import IconButton from '../../../components/ui/IconButton.tsx';
import PostCommentsList from '../components/PostCommentsList.tsx';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import AppForm from '../../../components/ui/AppForm.tsx';
import NotFoundPage from '../../../components/NotFoundPage.tsx';

const Post = () => {
  const { id } = useParams();
  const postIdInt = useMemo(() => Number(id), [id]);

  const [comment, setComment] = useState('');
  const [currentPostIdIndex, setCurrentPostIdIndex] = useState(0);

  const confirmDeletePostModal = useShowElement();

  const navigate = useNavigate();

  const { data: dataPost, loading } = useGetPostByIdQuery({
    variables: {
      id: postIdInt
    }
  });

  const { data: dataComments, refetch: refetchComments } = useGetCommentsByPostIdQuery({
    variables: {
      postId: postIdInt
    }
  });

  const [deletePost] = useDeletePostMutation({
    variables: {
      id: postIdInt
    }
  });

  const [createComment, { loading: isCreateCommentInProgress }] = useCreateCommentMutation({
    variables: {
      postId: postIdInt,
      text: comment
    }
  });

  const [deleteComment] = useDeleteCommentMutation();

  const postCreatedDate = useMemo(() => {
    if (!dataPost?.getPostById?.createdAt) {
      return null;
    }
    return formatDate(dataPost?.getPostById?.createdAt);
  }, [dataPost?.getPostById?.createdAt]);

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({
      variables: {
        id: commentId
      }
    });
    await refetchComments();
  };

  const loopThroughPosts = (up: boolean) => {
    const coeff = up ? 1 : -1;
    const nextPostIdIndex = currentPostIdIndex + coeff;

    const nextPostId = dataPost?.getPostById?.otherPostIds?.[nextPostIdIndex];

    if (!nextPostId) {
      return;
    }

    setCurrentPostIdIndex(nextPostIdIndex);
    navigate(getPostLink(nextPostId));
  };

  const addComment = async () => {
    await createComment();
    setComment('');
    await refetchComments();
  };

  const onDeletePost = async () => {
    await deletePost();
    navigate(RoutesEnum.HOME);
  };

  if (loading) {
    return (
      <div className="absolute top-0 flex h-screen w-full items-center justify-center bg-black">
        <ImSpinner2
          className="ml-1 animate-spin"
          color="#fff"
          size="100"
        />
      </div>
    );
  }

  if (!dataPost?.getPostById) {
    return <NotFoundPage />;
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full overflow-auto bg-black lg:flex lg:overflow-hidden">
      <section className="relative h-full w-full">
        <Link
          to={RoutesEnum.HOME}
          className={`${styles['video-block-btn']} left-4 top-4`}
        >
          <ImCross
            color="#fff"
            size="25"
          />
        </Link>

        <button
          className={`${styles['video-block-btn']} right-4 top-4`}
          onClick={() => loopThroughPosts(true)}
        >
          <BiChevronUp
            color="#fff"
            size="30"
          />
        </button>

        <button
          className={`${styles['video-block-btn']} right-4 top-20`}
          onClick={() => loopThroughPosts(false)}
        >
          <BiChevronDown
            color="#fff"
            size="30"
          />
        </button>

        <div className="bg-black lg:min-w-120">
          <video
            src={dataPost.getPostById.video}
            className="mx-auto h-screen"
            controls
            autoPlay
            muted
            loop
          ></video>
        </div>
      </section>

      <section className="relative flex h-full w-full flex-col bg-white lg:max-w-140">
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center gap-3">
            <Link to={getProfileLink(dataPost.getPostById.user.id)}>
              <UserAvatar
                image={dataPost.getPostById.user.image}
                className="!w-10"
              />
            </Link>

            <div className="pt-0.5">
              <h3 className="text-lg font-semibold">{dataPost?.getPostById.user.fullname}</h3>
              <time className="text-sm font-medium">{postCreatedDate}</time>
            </div>
          </div>

          {dataPost.getPostById.canDelete && (
            <IconButton
              Icon={MdOutlineDeleteForever}
              onClick={confirmDeletePostModal.open}
            />
          )}
        </div>

        <div className="px-8 text-sm">{dataPost.getPostById.text}</div>

        <div className="mb-4 mt-8 flex items-center gap-4 px-8">
          <LikeButton post={dataPost.getPostById} />

          <PostShareButton text={dataPost.getPostById.text} />
        </div>

        <div className="w-full flex-1 overflow-auto border-t-2 bg-gray-100 pb-28">
          <PostCommentsList
            comments={dataComments?.getCommentsByPostId || []}
            handleDeleteComment={handleDeleteComment}
          />
        </div>

        <AppForm className="absolute bottom-0 flex w-full items-center justify-between gap-3 border-t-2 bg-white px-8 py-5">
          <div className="flex-1">
            <AppInput
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isCreateCommentInProgress}
            />
          </div>

          <AppButton
            appearance="transparentDanger"
            disabled={!comment || isCreateCommentInProgress}
            onClick={addComment}
          >
            Post
          </AppButton>
        </AppForm>
      </section>

      <ConfirmModal
        showElement={confirmDeletePostModal}
        title="Are you sure you want to delete this post?"
        onConfirm={onDeletePost}
      />
    </div>
  );
};

export default Post;
