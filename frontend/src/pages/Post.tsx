import {Link, useNavigate, useParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_COMMENT} from "../graphql/mutations/CreateComment.ts";
import {GET_COMMENTS_BY_POST_ID} from "../graphql/queries/GetCommentsByPostId.ts";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  GetCommentsByPostIdQuery,
  GetCommentsByPostIdQueryVariables,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  LikePostMutation,
  LikePostMutationVariables, UnlikePostMutation, UnlikePostMutationVariables
} from "../gql/graphql.ts";
import {DELETE_COMMENT} from "../graphql/mutations/DeleteComment.ts";
import {GET_POST_BY_ID} from "../graphql/queries/GetPostById.ts";
import {usePostStore} from "../stores/postStore.ts";
import {useUserStore} from "../stores/userStore.ts";
import {LIKE_POST} from "../graphql/mutations/LikePost.ts";
import {UNLIKE_POST} from "../graphql/mutations/UnlikePost.ts";
import {ImCross, ImSpinner2} from "react-icons/im";
import {BiChevronDown, BiChevronUp} from "react-icons/bi";
import tikTokLogo from '../assets/images/tiktok-logo-small.png'
import avatarPlaceholder from "../assets/images/avatar-placeholder.png";
import {MdOutlineDeleteForever} from "react-icons/md";
import {BsMusicNoteBeamed} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";

const Post = () => {
  const { id } = useParams<{ id: string }>();

  const [comment, setComment] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPostIdIndex, setCurrentPostIdIndex] = useState<number>(0);

  const navigate = useNavigate()

  const likedPosts = usePostStore(state => state.likedPosts)
  const likePost = usePostStore(state => state.likePost)
  const removeLike = usePostStore(state => state.removeLike)

  const loggedInUserId = useUserStore(state => state.id)

  const postIdInt = useMemo(() => Number(id), [id])

  const { data: dataPost, loading: loadingPost } = useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GET_POST_BY_ID, {
    variables: {
      id: postIdInt
    },
    onCompleted: () => {
      setIsLoaded(true);
    }
  })

  const [createComment, { data: commentsData }] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CREATE_COMMENT, {
    variables: {
      postId: postIdInt,
      text: comment
    },
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_POST_ID,
        variables: {
          postId: postIdInt,
        }
      }
    ]
  })

  const [deleteComment] = useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DELETE_COMMENT, {
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_POST_ID,
        variables: {
          postId: postIdInt,
        }
      }
    ]
  })

  const [likePostFn] = useMutation<LikePostMutation, LikePostMutationVariables>(LIKE_POST, {
    variables: {
      postId: postIdInt
    },
    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: {
          id: postIdInt
        }
      }
    ]
  })

  const [unlikePostFn] = useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UNLIKE_POST, {
    variables: {
      postId: postIdInt
    },
    refetchQueries: [
      {
        query: GET_POST_BY_ID,
        variables: {
          id: postIdInt
        }
      }
    ]
  })

  const { data, loading: loadingComments, refetch } = useQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GET_COMMENTS_BY_POST_ID, {
    variables: {
      postId: postIdInt
    }
  })

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({
      variables: {
        id: commentId
      }
    })
  }

  const loopThroughPostsUp = () => {
    if (currentPostIdIndex + 1 === dataPost?.getPostById?.otherPostIds?.length) {
      return
    }

    setCurrentPostIdIndex(prev => prev + 1)
    const nextPostId = dataPost?.getPostById?.otherPostIds?.[currentPostIdIndex + 1]
    navigate(`/post/${nextPostId}`)
  }

  const loopThroughPostsDown = () => {
    if (currentPostIdIndex === 0) {
      return
    }

    setCurrentPostIdIndex(prev => prev - 1)
    const nextPostId = dataPost?.getPostById?.otherPostIds?.[currentPostIdIndex - 1]
    navigate(`/post/${nextPostId}`)
  }

  const addComment = async () => {
    await createComment()
    setComment('')
  }

  const handleRemoveLike = async () => {
    await unlikePostFn()
    removeLike(postIdInt)
  }

  const handleLikePost = async () => {
    const { data } = await likePostFn()
    removeLike(postIdInt)
    if (data?.likePost) {
      likePost(data?.likePost)
    }
  }
// TODO useMemo
  const isLiked = likedPosts.some(likedPost => likedPost.userId === loggedInUserId)

  const userImageSrc = useMemo(() => dataPost?.getPostById.user.image || avatarPlaceholder, [dataPost])

  return (
    <div className="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto">
      <div className="lg:w-[calc(100% - 540px)] w-full h-full relative">
        <Link to="/"
              className="absolute z-20 m-5 rounded-full hover:bg-gray-800 bg-gray-700 p-1.5 transition-all duration-300">
          <ImCross color="#fff" size="27"/>
        </Link>

        <button
          className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800 transition-all duration-300"
          onClick={loopThroughPostsUp}
        >
          <BiChevronUp color="#fff" size="30"/>
        </button>

        <button
          className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800 transition-all duration-300"
          onClick={loopThroughPostsDown}
        >
          <BiChevronDown color="#fff" size="30"/>
        </button>
        <img
          src={tikTokLogo}
          alt="tik-tok-logo"
          className="absolute top-[18px] left-[70px] max-w-[80px] rounded-full lg:mx-0 mx-auto"
        />
      </div>

      {!isLoaded && (
        <div className="absolute top-0 flex items-center justify-center bg-black bg-opacity-70 h-screen w-full">
          <ImSpinner2
            className="animate-spin ml-1"
            color="#fff"
            size="100"
          />
      </div>
      )}

      {dataPost?.getPostById && (
        <div className="bg-black bg-opacity-90 lg:min-w-[480px]">
          <video
            src={`http://localhost:3000${dataPost.getPostById.video}`}
            className="h-screen mx-auto"
            controls
            autoPlay
            muted
            loop
          ></video>
        </div>
      )}

      {dataPost?.getPostById && (
        <div
          className="lg:max-w-[550px] relative w-full h-full bg-white"
        >
          <div className="py-7"/>

          <div className="flex items-center justify-between px-8">
            <div className="flex items-center">
              <Link to="/">
               <img
                src={userImageSrc}
                alt="avatar"
                width="40"
                className="rounded-full lg:mx-0 mx-auto"
               />
              </Link>

              <div className="ml-3 pt-0.5">
                <div className="text-[17px] font-semibold">User name</div>
                  <div className="text-[13] font-light">
                    {dataPost?.getPostById.user.fullname}
                    <span className="relative top-[6px] text-[30px] pr-0.5">•</span>
                    <span className="font-medium">
                      {new Date(dataPost?.getPostById?.createdAt).toLocaleString()}
                    </span>
                </div>
              </div>
            </div>

            <MdOutlineDeleteForever size="25" className="cursor-pointer" />
          </div>

          <div className="px-6 mt-4 text-sm">{ dataPost.getPostById.text }</div>

          <div className="flex items-center gap-1 px-8 mt-4 text-sm font-bold">
            <BsMusicNoteBeamed size="17" />
            Original sound - {dataPost?.getPostById.user.fullname}
          </div>

          <div className="flex items-center px-8 mt-8">
            <button
              className="rounded-full bg-gray-700 p-1.5 hover:bg-gray-800 transition-all duration-300"
              onClick={() => (isLiked ? handleRemoveLike() : handleLikePost())}
            >
              <AiFillHeart size="25" color={isLiked ? 'red' : 'black'} />
            </button>
          </div>

      </div>
      )}
    </div>
  );
};

export default Post;