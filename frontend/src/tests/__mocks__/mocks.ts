import { PostType, User } from '../../gql/graphql.tsx';

export const mockedUser: User = {
  bio: '',
  canFollow: false,
  canSendMessage: false,
  email: 'test@test.com',
  fullname: 'fullname',
  id: 1,
  image: '',
  isFollowed: false
};

export const mockedPost: PostType = {
  canDelete: false,
  canEdit: false,
  commentsCount: 0,
  createdAt: new Date(),
  id: 1,
  isLiked: false,
  likesCount: 0,
  tags: [],
  text: 'text',
  user: mockedUser,
  video: ''
};
