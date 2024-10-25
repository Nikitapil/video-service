import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { GET_COMMENTS_BY_POST_ID } from '../queries/GetCommentsByPostId.ts';
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
  useGetCommentsByPostIdQuery,
  useGetPostByIdQuery
} from '../../../gql/graphql.tsx';
import { getPostLink } from '../../../router/routes.ts';

const Post = () => {
  const { id } = useParams();
  const postIdInt = useMemo(() => Number(id), [id]);

  const [comment, setComment] = useState('');
  const [currentPostIdIndex, setCurrentPostIdIndex] = useState(0);

  const navigate = useNavigate();

  const loggedInUserId = useUserStore((state) => state.user?.id);

  const { data: dataPost, loading } = useGetPostByIdQuery({
    variables: {
      id: postIdInt
    }
  });

  const [createComment, { loading: isCreateCommentInProgress }] = useCreateCommentMutation({
    variables: {
      postId: postIdInt,
      text: comment
    },
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_POST_ID,
        variables: {
          postId: postIdInt
        }
      }
    ]
  });

  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_POST_ID,
        variables: {
          postId: postIdInt
        }
      }
    ]
  });

  const { data } = useGetCommentsByPostIdQuery({
    variables: {
      postId: postIdInt
    }
  });

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({
      variables: {
        id: commentId
      }
    });
  };

  const loopThroughPostsUp = () => {
    const nextPostIdIndex = currentPostIdIndex + 1;

    if (nextPostIdIndex === dataPost?.getPostById?.otherPostIds?.length) {
      return;
    }

    setCurrentPostIdIndex(nextPostIdIndex);

    const nextPostId = dataPost?.getPostById?.otherPostIds?.[nextPostIdIndex];

    if (nextPostId) {
      navigate(getPostLink(nextPostId));
    }
  };

  const loopThroughPostsDown = () => {
    if (currentPostIdIndex === 0) {
      return;
    }

    setCurrentPostIdIndex((prev) => prev - 1);
    const nextPostId = dataPost?.getPostById?.otherPostIds?.[currentPostIdIndex - 1];
    navigate(`/post/${nextPostId}`);
  };

  const addComment = async () => {
    await createComment();
    setComment('');
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full justify-between overflow-auto bg-black lg:flex lg:overflow-hidden">
      {loading && (
        <div className="absolute top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-70">
          <ImSpinner2
            className="ml-1 animate-spin"
            color="#fff"
            size="100"
          />
        </div>
      )}
      {dataPost?.getPostById && (
        <>
          <div className="lg:w-[calc(100% - 540px)] relative h-full w-full">
            <Link
              to="/"
              className="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 transition-all duration-300 hover:bg-gray-800"
            >
              <ImCross
                color="#fff"
                size="27"
              />
            </Link>

            <button
              className="absolute right-4 top-4 z-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 transition-all duration-300 hover:bg-gray-800"
              onClick={loopThroughPostsUp}
            >
              <BiChevronUp
                color="#fff"
                size="30"
              />
            </button>

            <button
              className="absolute right-4 top-20 z-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 transition-all duration-300 hover:bg-gray-800"
              onClick={loopThroughPostsDown}
            >
              <BiChevronDown
                color="#fff"
                size="30"
              />
            </button>

            <div className="bg-black bg-opacity-90 lg:min-w-[480px]">
              <video
                src={`http://localhost:3000${dataPost.getPostById.video}`}
                className="mx-auto h-screen"
                controls
                autoPlay
                muted
                loop
              ></video>
            </div>
          </div>

          <div className="relative flex h-full w-full flex-col bg-white lg:max-w-[550px]">
            <div className="py-7" />

            <div className="flex items-center justify-between px-8">
              <div className="flex items-center">
                <Link to="/">
                  <UserAvatar
                    image={dataPost?.getPostById.user.image}
                    className="w-10"
                  />
                </Link>

                <div className="ml-3 pt-0.5">
                  <div className="text-[17px] font-semibold">User name</div>
                  <div className="font-light text-[13]">
                    {dataPost?.getPostById.user.fullname}
                    <span className="relative top-[6px] pr-0.5 text-[30px]">•</span>
                    <span className="font-medium">{new Date(dataPost?.getPostById?.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <MdOutlineDeleteForever
                size="25"
                className="cursor-pointer"
              />
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

              {data?.getCommentsByPostId.length === 0 && (
                <div className="mt-6 text-center text-xl text-gray-500">No comments...</div>
              )}

              <div className="mt-4 flex flex-col items-center justify-between px-8">
                {data?.getCommentsByPostId.map((comment) => (
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
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
