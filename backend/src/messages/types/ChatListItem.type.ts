import { MessageType } from './Message.type';
import { User } from '../../user/types/user.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ChatListItemFromDb } from '../types';

interface ChatListItemTypeConstructorParameters {
  chatFromDb: ChatListItemFromDb;
  currentUserId: number;
}

@ObjectType()
export class ChatListItemType {
  @Field(() => String)
  id: string;

  @Field(() => MessageType)
  lastMessage: MessageType;

  @Field(() => User)
  chatWithUser: User;

  @Field(() => Int)
  unreadMessagesCount: number;

  constructor({
    chatFromDb,
    currentUserId
  }: ChatListItemTypeConstructorParameters) {
    this.id = chatFromDb.id;

    this.lastMessage = new MessageType({
      message: chatFromDb.messages[0],
      currentUserId
    });

    const oppositeUser = chatFromDb.chatUser.find(
      (user) => user.user.id !== currentUserId
    );

    this.chatWithUser = new User(oppositeUser.user, currentUserId);

    this.unreadMessagesCount = chatFromDb._count.messages;
  }
}
