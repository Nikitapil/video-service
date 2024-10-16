import { GetChatsListQuery } from '../../gql/graphql.tsx';
import { ArrayElement } from '../../utils/types.ts';

export type ChatListType = GetChatsListQuery['getChatList'];

export type ChatListItemType = ArrayElement<ChatListType>;
