import { User } from '../../user/types/user.type';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { MessageFromDb } from '../types';

interface MessageTypeConstructorParameters {
  message: MessageFromDb;
  currentUserId: number;
}

@ObjectType()
export class MessageType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  chatId: string;

  @Field(() => User)
  author: User;

  @Field(() => String)
  text: string;

  @Field(() => Boolean)
  isOpened: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => Boolean)
  isMyMessage: boolean;

  constructor({ message, currentUserId }: MessageTypeConstructorParameters) {
    this.id = message.id;
    this.author = new User(message.author, currentUserId);
    this.text = message.text;
    this.isOpened = message.isOpened;
    this.createdAt = message.createdAt;
    this.chatId = message.chatId;
    this.isMyMessage = message.author.id === currentUserId;
  }
}
