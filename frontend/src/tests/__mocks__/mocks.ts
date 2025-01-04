import { GetChatQuery, PostType, User } from '../../gql/graphql.tsx';
import { ChatListItemType, TMessage } from '../../modules/messages/types.ts';

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

export const mockedMessage: TMessage = {
  author: mockedUser,
  chatId: '123',
  createdAt: new Date(),
  id: '123',
  isMyMessage: false,
  text: 'text'
};

export const mockedChat: GetChatQuery['getChat'] = {
  id: '123',
  messages: [mockedMessage],
  chatWithUser: mockedUser
};
