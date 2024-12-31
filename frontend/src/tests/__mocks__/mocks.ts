import { PostType, User } from '../../gql/graphql.tsx';
import { ChatListItemType } from '../../modules/messages/types.ts';

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

export const mockedChatListItem: ChatListItemType = {
  id: '123',
  unreadMessagesCount: 0,
  lastMessage: {
    id: '123',
    text: 'text',
    author: { fullname: 'fullname' }
  },
  chatWithUser: mockedUser
};
