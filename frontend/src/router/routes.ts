export enum RoutesEnum {
  UPLOAD = '/upload',
  HOME = '/',
  MESSAGES = '/messages',
  USERS_FOLLOW = '/users/:type'
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

export const getUserFollowLink = (type: UserFollowPagesTypesEnum) => `/users/${type}`;
