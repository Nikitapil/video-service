export enum RoutesEnum {
  UPLOAD = '/upload',
  HOME = '/',
  MESSAGES = '/messages',
  USERS_FOLLOW = '/users/:userId/:type',
  CHAT = '/messages/:id',
  PROFILE = '/profile/:id',
  POST = '/post/:id',
  USERS = '/users'
}

export enum UserFollowPagesTypesEnum {
  FOLLOWING = 'following',
  FOLLOWERS = 'followers'
}

export const getProfileLink = (id: number) => {
  return `/profile/${id}`;
};

export const getUsersSearchLink = (search: string) => {
  return `/users/?search=${search}`;
};

export const getPostSearchLink = (search: string) => {
  return `/?searchPost=${search}`;
};

export const getUserFollowLink = (type: UserFollowPagesTypesEnum, userId: number) => `/users/${userId}/${type}`;

export const getPostLink = (id: number) => `/post/${id}`;

export const getChatUrl = (id: string) => `/messages/${id}`;
