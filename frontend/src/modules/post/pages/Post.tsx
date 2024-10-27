import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import { ImCross, ImSpinner2 } from 'react-icons/im';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsMusicNoteBeamed } from 'react-icons/bs';
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

const Post = () => {
  const { id } = useParams();
  const postIdInt = useMemo(() => Number(id), [id]);

  const [comment, setComment] = useState('');
  const [currentPostIdIndex, setCurrentPostIdIndex] = useState(0);

  const confirmDeletePostModal = useShowElement();

  const navigate = useNavigate();

  const loggedInUserId = useUserStore((state) => state.user?.id);

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
    return (
      <div className="absolute top-0 flex h-screen w-full flex-col items-center justify-center gap-4 bg-black">
        <h2 className="text-3xl text-white">Post not found</h2>
        <Link
          className="block text-white common-transition hover:text-gray-400"
          to={RoutesEnum.HOME}
        >
          Go back to home page
        </Link>
      </div>
    );
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

        <div className="mt-4 px-6 text-sm">{dataPost.getPostById.text}</div>

        <div className="mt-4 flex items-center gap-1 px-8 text-sm font-bold">
          <BsMusicNoteBeamed size="17" />
          Original sound - {dataPost?.getPostById.user.fullname}
        </div>

        <div className="mb-4 mt-8 flex items-center gap-4 px-8">
          <LikeButton post={dataPost.getPostById} />

          <PostShareButton text={dataPost.getPostById.text} />
        </div>

        <div className="z-0 w-full flex-1 overflow-auto border-t-2 bg-[#f8f8f8]">
          <div className="pt-2" />

          {dataComments?.getCommentsByPostId.length === 0 && (
            <div className="mt-6 text-center text-xl text-gray-500">No comments...</div>
          )}

          <div className="mt-4 flex flex-col items-center justify-between px-8">
            {dataComments?.getCommentsByPostId.map((comment) => (
              <div
                className="relative flex w-full items-center"
                key={comment.id}
              >
                <Link to="/">
                  <UserAvatar
                    image={comment.user.image}
                    className="w-10"
                  />
                </Link>

                <div className="ml-14 w-full pt-0.5">
                  <div className="flex items-center justify-between text-[10px] font-semibold">
                    User name
                    {comment.user.id === loggedInUserId && (
                      <MdOutlineDeleteForever
                        className="cursor-pointer"
                        size="25"
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                    )}
                  </div>
                  <div className="text-[15px] font-light">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-28" />
        </div>

        <div className="absolute bottom-0 flex h-[85px] w-full items-center justify-between border-t-2 bg-white px-8 py-5 lg:max-w-[550px]">
          <div className="flex w-full items-center rounded-lg bg-[#f1f1f2] has-[input:focus]:border has-[input:focus]:border-gray-400 lg:max-w-[420px]">
            <input
              className="w-full rounded-lg border-none bg-[#f1f1f2] p-2 outline-none lg:max-w-[420px]"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isCreateCommentInProgress}
            />
          </div>

          <button
            className="ml-5 cursor-pointer pr-1 text-sm font-semibold text-[#f02c56] disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={!comment || isCreateCommentInProgress}
            onClick={addComment}
          >
            Post
          </button>
        </div>
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
