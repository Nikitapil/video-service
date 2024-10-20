import { GetChatsListQuery, MessageType } from '../../gql/graphql.tsx';
import { ArrayElement } from '../../utils/types.ts';

export type ChatListType = GetChatsListQuery['getChatList'];

export type ChatListItemType = ArrayElement<ChatListType>;

export type TMessage = Omit<MessageType, 'isOpened'>;
