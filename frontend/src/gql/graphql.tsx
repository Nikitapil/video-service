import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type ChatListItemType = {
  __typename?: 'ChatListItemType';
  chatWithUser: User;
  id: Scalars['String']['output'];
  lastMessage: MessageType;
  unreadMessagesCount: Scalars['Int']['output'];
};

export type ChatType = {
  __typename?: 'ChatType';
  id: Scalars['String']['output'];
  messages: Array<MessageType>;
};

export type CommentType = {
  __typename?: 'CommentType';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  post: PostType;
  text: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type CreateMessageDto = {
  text: Scalars['String']['input'];
  userToId: Scalars['Int']['input'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type GetUsersDto = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type MessageType = {
  __typename?: 'MessageType';
  author: User;
  chatId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isOpened: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentType;
  createMessage: MessageType;
  createPost: PostType;
  deleteComment?: Maybe<Scalars['String']['output']>;
  deletePost: Scalars['String']['output'];
  login: LoginResponse;
  logout: Scalars['String']['output'];
  openChatMessages: SuccessMessageType;
  refreshToken: RefreshType;
  register: RegisterResponse;
  toggleLikePost: ToggleLike;
  toggleUserFollow: ToggleFollowType;
  updateUser: User;
};

export type MutationCreateCommentArgs = {
  postId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type MutationCreateMessageArgs = {
  createMesageInput: CreateMessageDto;
};

export type MutationCreatePostArgs = {
  tags?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
};

export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};

export type MutationLoginArgs = {
  loginInput: LoginDto;
};

export type MutationOpenChatMessagesArgs = {
  chatId: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};

export type MutationToggleLikePostArgs = {
  postId: Scalars['Int']['input'];
};

export type MutationToggleUserFollowArgs = {
  userToFollowId: Scalars['Int']['input'];
};

export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
};

export type PostDetails = {
  __typename?: 'PostDetails';
  commentsCount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Float']['output']>;
  otherPostIds?: Maybe<Array<Scalars['Int']['output']>>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  user: User;
  video: Scalars['String']['output'];
};

export type PostType = {
  __typename?: 'PostType';
  commentsCount?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Float']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  user: User;
  video: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getChat: ChatType;
  getChatList: Array<ChatListItemType>;
  getCommentsByPostId: Array<CommentType>;
  getPostById: PostDetails;
  getPosts: Array<PostType>;
  getPostsByUserId: Array<PostType>;
  getUsers: Array<User>;
};

export type QueryGetChatArgs = {
  chatId: Scalars['String']['input'];
};

export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars['Int']['input'];
};

export type QueryGetPostByIdArgs = {
  id: Scalars['Int']['input'];
};

export type QueryGetPostsArgs = {
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type QueryGetPostsByUserIdArgs = {
  userId: Scalars['Int']['input'];
};

export type QueryGetUsersArgs = {
  getUsersInput?: InputMaybe<GetUsersDto>;
};

export type RefreshType = {
  __typename?: 'RefreshType';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type RegisterDto = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type SuccessMessageType = {
  __typename?: 'SuccessMessageType';
  message: Scalars['String']['output'];
};

export type ToggleFollowType = {
  __typename?: 'ToggleFollowType';
  isFollowed: Scalars['Boolean']['output'];
};

export type ToggleLike = {
  __typename?: 'ToggleLike';
  isLiked: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  canFollow?: Maybe<Scalars['Boolean']['output']>;
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isFollowed?: Maybe<Scalars['Boolean']['output']>;
};

export type GetSuggestedUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestedUsersQuery = {
  __typename?: 'Query';
  getUsers: Array<{
    __typename?: 'User';
    id: number;
    fullname: string;
    email: string;
    image?: string | null;
    bio?: string | null;
  }>;
};

export type GetPostsQueryVariables = Exact<{
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetPostsQuery = {
  __typename?: 'Query';
  getPosts: Array<{
    __typename?: 'PostType';
    id: number;
    text: string;
    video: string;
    createdAt: any;
    tags: Array<string>;
    isLiked?: boolean | null;
    likesCount?: number | null;
    commentsCount?: number | null;
    user: {
      __typename?: 'User';
      id: number;
      fullname: string;
      email: string;
      image?: string | null;
      isFollowed?: boolean | null;
      canFollow?: boolean | null;
    };
  }>;
};

export type GetChatsListQueryVariables = Exact<{ [key: string]: never }>;

export type GetChatsListQuery = {
  __typename?: 'Query';
  getChatList: Array<{
    __typename?: 'ChatListItemType';
    id: string;
    unreadMessagesCount: number;
    lastMessage: {
      __typename?: 'MessageType';
      id: string;
      text: string;
      author: { __typename?: 'User'; fullname: string };
    };
    chatWithUser: { __typename?: 'User'; id: number; fullname: string; image?: string | null };
  }>;
};

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: {
    __typename?: 'CommentType';
    text: string;
    id: number;
    createdAt: string;
    user: { __typename?: 'User'; id: number; fullname: string; email: string };
    post: { __typename?: 'PostType'; id: number; text: string; video: string };
  };
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteCommentMutation = { __typename?: 'Mutation'; deleteComment?: string | null };

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;

export type GetCommentsByPostIdQuery = {
  __typename?: 'Query';
  getCommentsByPostId: Array<{
    __typename?: 'CommentType';
    id: number;
    text: string;
    createdAt: string;
    user: { __typename?: 'User'; id: number; fullname: string; email: string; image?: string | null };
    post: { __typename?: 'PostType'; id: number; text: string; video: string };
  }>;
};

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetPostByIdQuery = {
  __typename?: 'Query';
  getPostById: {
    __typename?: 'PostDetails';
    id: number;
    text: string;
    video: string;
    createdAt: any;
    isLiked?: boolean | null;
    otherPostIds?: Array<number> | null;
    user: { __typename?: 'User'; id: number; email: string; fullname: string; image?: string | null };
  };
};

export type UpdateUserProfileMutationVariables = Exact<{
  fullname?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
}>;

export type UpdateUserProfileMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: number;
    fullname: string;
    bio?: string | null;
    image?: string | null;
    email: string;
  };
};

export type GetPostsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;

export type GetPostsByUserIdQuery = {
  __typename?: 'Query';
  getPostsByUserId: Array<{
    __typename?: 'PostType';
    id: number;
    text: string;
    video: string;
    createdAt: any;
    user: { __typename?: 'User'; fullname: string; email: string; id: number };
  }>;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginUserMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'LoginResponse';
    user?: { __typename?: 'User'; email: string; id: number; fullname: string; image?: string | null } | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = { __typename?: 'Mutation'; logout: string };

export type RefreshAuthMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshAuthMutation = {
  __typename?: 'Mutation';
  refreshToken: {
    __typename?: 'RefreshType';
    accessToken: string;
    user: {
      __typename?: 'User';
      id: number;
      email: string;
      image?: string | null;
      fullname: string;
      bio?: string | null;
    };
  };
};

export type RegisterUserMutationVariables = Exact<{
  fullname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'RegisterResponse';
    user?: { __typename?: 'User'; id: number; fullname: string; email: string; image?: string | null } | null;
  };
};

export type SearchUsersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type SearchUsersQuery = {
  __typename?: 'Query';
  getUsers: Array<{ __typename?: 'User'; id: number; fullname: string }>;
};

export type ToggleUserFollowMutationVariables = Exact<{
  userToFollowId: Scalars['Int']['input'];
}>;

export type ToggleUserFollowMutation = {
  __typename?: 'Mutation';
  toggleUserFollow: { __typename?: 'ToggleFollowType'; isFollowed: boolean };
};

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;

export type LikePostMutation = {
  __typename?: 'Mutation';
  toggleLikePost: { __typename?: 'ToggleLike'; isLiked: boolean };
};

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String']['input'];
  video: Scalars['Upload']['input'];
  tags?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreatePostMutation = {
  __typename?: 'Mutation';
  createPost: { __typename?: 'PostType'; id: number; text: string; video: string };
};

export type GetUsersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetUsersQuery = {
  __typename?: 'Query';
  getUsers: Array<{
    __typename?: 'User';
    id: number;
    fullname: string;
    email: string;
    image?: string | null;
    bio?: string | null;
  }>;
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: { __typename?: 'RefreshType'; accessToken: string };
};

export const GetSuggestedUsersDocument = gql`
  query GetSuggestedUsers {
    getUsers(getUsersInput: { take: 5 }) {
      id
      fullname
      email
      image
      bio
    }
  }
`;

/**
 * __useGetSuggestedUsersQuery__
 *
 * To run a query within a React component, call `useGetSuggestedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(GetSuggestedUsersDocument, options);
}
export function useGetSuggestedUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(
    GetSuggestedUsersDocument,
    options
  );
}
export function useGetSuggestedUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>(
    GetSuggestedUsersDocument,
    options
  );
}
export type GetSuggestedUsersQueryHookResult = ReturnType<typeof useGetSuggestedUsersQuery>;
export type GetSuggestedUsersLazyQueryHookResult = ReturnType<typeof useGetSuggestedUsersLazyQuery>;
export type GetSuggestedUsersSuspenseQueryHookResult = ReturnType<typeof useGetSuggestedUsersSuspenseQuery>;
export type GetSuggestedUsersQueryResult = Apollo.QueryResult<GetSuggestedUsersQuery, GetSuggestedUsersQueryVariables>;
export const GetPostsDocument = gql`
  query GetPosts($skip: Int!, $take: Int!, $search: String) {
    getPosts(skip: $skip, take: $take, search: $search) {
      id
      text
      video
      createdAt
      tags
      isLiked
      likesCount
      commentsCount
      user {
        id
        fullname
        email
        image
        isFollowed
        canFollow
      }
    }
  }
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables> &
    ({ variables: GetPostsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export function useGetPostsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetChatsListDocument = gql`
  query GetChatsList {
    getChatList {
      id
      lastMessage {
        id
        author {
          fullname
        }
        text
      }
      chatWithUser {
        id
        fullname
        image
      }
      unreadMessagesCount
    }
  }
`;

/**
 * __useGetChatsListQuery__
 *
 * To run a query within a React component, call `useGetChatsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsListQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChatsListQuery, GetChatsListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetChatsListQuery, GetChatsListQueryVariables>(GetChatsListDocument, options);
}
export function useGetChatsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChatsListQuery, GetChatsListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetChatsListQuery, GetChatsListQueryVariables>(GetChatsListDocument, options);
}
export function useGetChatsListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetChatsListQuery, GetChatsListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetChatsListQuery, GetChatsListQueryVariables>(GetChatsListDocument, options);
}
export type GetChatsListQueryHookResult = ReturnType<typeof useGetChatsListQuery>;
export type GetChatsListLazyQueryHookResult = ReturnType<typeof useGetChatsListLazyQuery>;
export type GetChatsListSuspenseQueryHookResult = ReturnType<typeof useGetChatsListSuspenseQuery>;
export type GetChatsListQueryResult = Apollo.QueryResult<GetChatsListQuery, GetChatsListQueryVariables>;
export const CreateCommentDocument = gql`
  mutation CreateComment($text: String!, $postId: Int!) {
    createComment(text: $text, postId: $postId) {
      text
      id
      createdAt
      user {
        id
        fullname
        email
      }
      post {
        id
        text
        video
      }
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id)
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const GetCommentsByPostIdDocument = gql`
  query GetCommentsByPostId($postId: Int!) {
    getCommentsByPostId(postId: $postId) {
      id
      text
      createdAt
      user {
        id
        fullname
        email
        image
      }
      post {
        id
        text
        video
      }
    }
  }
`;

/**
 * __useGetCommentsByPostIdQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsByPostIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables> &
    ({ variables: GetCommentsByPostIdQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(
    GetCommentsByPostIdDocument,
    options
  );
}
export function useGetCommentsByPostIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(
    GetCommentsByPostIdDocument,
    options
  );
}
export function useGetCommentsByPostIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(
    GetCommentsByPostIdDocument,
    options
  );
}
export type GetCommentsByPostIdQueryHookResult = ReturnType<typeof useGetCommentsByPostIdQuery>;
export type GetCommentsByPostIdLazyQueryHookResult = ReturnType<typeof useGetCommentsByPostIdLazyQuery>;
export type GetCommentsByPostIdSuspenseQueryHookResult = ReturnType<typeof useGetCommentsByPostIdSuspenseQuery>;
export type GetCommentsByPostIdQueryResult = Apollo.QueryResult<
  GetCommentsByPostIdQuery,
  GetCommentsByPostIdQueryVariables
>;
export const GetPostByIdDocument = gql`
  query GetPostById($id: Int!) {
    getPostById(id: $id) {
      id
      text
      video
      createdAt
      user {
        id
        email
        fullname
        image
      }
      isLiked
      otherPostIds
    }
  }
`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables> &
    ({ variables: GetPostByIdQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
}
export function useGetPostByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
}
export function useGetPostByIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
}
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdSuspenseQueryHookResult = ReturnType<typeof useGetPostByIdSuspenseQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const UpdateUserProfileDocument = gql`
  mutation UpdateUserProfile($fullname: String, $bio: String, $image: Upload) {
    updateUser(fullname: $fullname, bio: $bio, image: $image) {
      id
      fullname
      bio
      image
      email
    }
  }
`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      fullname: // value for 'fullname'
 *      bio: // value for 'bio'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    UpdateUserProfileDocument,
    options
  );
}
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;
export const GetPostsByUserIdDocument = gql`
  query getPostsByUserId($userId: Int!) {
    getPostsByUserId(userId: $userId) {
      id
      text
      video
      createdAt
      user {
        fullname
        email
        id
      }
    }
  }
`;

/**
 * __useGetPostsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPostsByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables> &
    ({ variables: GetPostsByUserIdQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(GetPostsByUserIdDocument, options);
}
export function useGetPostsByUserIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(GetPostsByUserIdDocument, options);
}
export function useGetPostsByUserIdSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(
    GetPostsByUserIdDocument,
    options
  );
}
export type GetPostsByUserIdQueryHookResult = ReturnType<typeof useGetPostsByUserIdQuery>;
export type GetPostsByUserIdLazyQueryHookResult = ReturnType<typeof useGetPostsByUserIdLazyQuery>;
export type GetPostsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetPostsByUserIdSuspenseQuery>;
export type GetPostsByUserIdQueryResult = Apollo.QueryResult<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>;
export const LoginUserDocument = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        email
        id
        fullname
        image
      }
    }
  }
`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
  mutation LogoutUser {
    logout
  }
`;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
}
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RefreshAuthDocument = gql`
  mutation RefreshAuth {
    refreshToken {
      accessToken
      user {
        id
        email
        image
        fullname
        bio
      }
    }
  }
`;
export type RefreshAuthMutationFn = Apollo.MutationFunction<RefreshAuthMutation, RefreshAuthMutationVariables>;

/**
 * __useRefreshAuthMutation__
 *
 * To run a mutation, you first call `useRefreshAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAuthMutation, { data, loading, error }] = useRefreshAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshAuthMutation, RefreshAuthMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshAuthMutation, RefreshAuthMutationVariables>(RefreshAuthDocument, options);
}
export type RefreshAuthMutationHookResult = ReturnType<typeof useRefreshAuthMutation>;
export type RefreshAuthMutationResult = Apollo.MutationResult<RefreshAuthMutation>;
export type RefreshAuthMutationOptions = Apollo.BaseMutationOptions<RefreshAuthMutation, RefreshAuthMutationVariables>;
export const RegisterUserDocument = gql`
  mutation RegisterUser($fullname: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { fullname: $fullname, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      user {
        id
        fullname
        email
        image
      }
    }
  }
`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      fullname: // value for 'fullname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
}
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const SearchUsersDocument = gql`
  query SearchUsers($search: String) {
    getUsers(getUsersInput: { search: $search }) {
      id
      fullname
    }
  }
`;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
}
export function useSearchUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
}
export function useSearchUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
}
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersSuspenseQueryHookResult = ReturnType<typeof useSearchUsersSuspenseQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const ToggleUserFollowDocument = gql`
  mutation ToggleUserFollow($userToFollowId: Int!) {
    toggleUserFollow(userToFollowId: $userToFollowId) {
      isFollowed
    }
  }
`;
export type ToggleUserFollowMutationFn = Apollo.MutationFunction<
  ToggleUserFollowMutation,
  ToggleUserFollowMutationVariables
>;

/**
 * __useToggleUserFollowMutation__
 *
 * To run a mutation, you first call `useToggleUserFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleUserFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleUserFollowMutation, { data, loading, error }] = useToggleUserFollowMutation({
 *   variables: {
 *      userToFollowId: // value for 'userToFollowId'
 *   },
 * });
 */
export function useToggleUserFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<ToggleUserFollowMutation, ToggleUserFollowMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ToggleUserFollowMutation, ToggleUserFollowMutationVariables>(
    ToggleUserFollowDocument,
    options
  );
}
export type ToggleUserFollowMutationHookResult = ReturnType<typeof useToggleUserFollowMutation>;
export type ToggleUserFollowMutationResult = Apollo.MutationResult<ToggleUserFollowMutation>;
export type ToggleUserFollowMutationOptions = Apollo.BaseMutationOptions<
  ToggleUserFollowMutation,
  ToggleUserFollowMutationVariables
>;
export const LikePostDocument = gql`
  mutation LikePost($postId: Int!) {
    toggleLikePost(postId: $postId) {
      isLiked
    }
  }
`;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const CreatePostDocument = gql`
  mutation CreatePost($text: String!, $video: Upload!, $tags: String) {
    createPost(text: $text, video: $video, tags: $tags) {
      id
      text
      video
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      video: // value for 'video'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetUsersDocument = gql`
  query GetUsers($search: String) {
    getUsers(getUsersInput: { search: $search }) {
      id
      fullname
      email
      image
      bio
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export function useGetUsersSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
