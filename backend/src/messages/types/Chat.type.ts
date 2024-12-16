import { MessageType } from './Message.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChatFromDb } from '../types';
import { User } from '../../user/types/user.type';
import { BadRequestException } from '@nestjs/common';

interface ChatTypeConstructorParams {
  chat: ChatFromDb;
  currentUserId: number;
}

@ObjectType()
export class ChatType {
  @Field(() => String)
  id: string;

  @Field(() => [MessageType])
  messages: MessageType[];

  @Field(() => User)
  chatWithUser: User;

  constructor({ chat, currentUserId }: ChatTypeConstructorParams) {
    this.id = chat.id;
    this.messages = chat.messages.map(
      (message) => new MessageType({ message, currentUserId })
    );

    const userWith = chat.chatUser.find(
      (user) => user.user.id !== currentUserId
    );

    if (!userWith) {
      throw new BadRequestException();
    }

    this.chatWithUser = new User(userWith!.user, currentUserId);
  }
}
