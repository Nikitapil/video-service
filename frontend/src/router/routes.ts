export enum RoutesEnum {
  UPLOAD = '/upload',
  HOME = '/',
  MESSAGES = '/messages'
}

export const getProfileLink = (id: number) => {
  return `/profile/${id}`;
};

export const getUsersSearchLink = (search: string) => {
  return `/users/?search=${search}`;
};
