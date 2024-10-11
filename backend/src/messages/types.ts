import { CreateMessageDto } from './dto/create-message.dto';
import { UserFromDb } from '../user/types';

export interface ICreateMessageParams {
  dto: CreateMessageDto;
  authorId: number;
}

export interface MessageFromDb {
  id: string;
  text: string;
  author: UserFromDb;
  isOpened: boolean;
  createdAt: Date;
  chatId: string;
}

export interface ChatUserFromDb {
  user: UserFromDb;
}

export interface ChatListItemFromDb {
  id: string;
  messages: MessageFromDb[];
  chatUser: ChatUserFromDb[];
  _count: {
    messages: number;
  };
}

export interface GetChatParams {
  currentUserId: number;
  chatId: string;
}

export interface ChatFromDb {
  id: string;
  messages: MessageFromDb[];
}

export interface OpenChatMessagesParams {
  currentUserId: number;
  chatId: string;
}
