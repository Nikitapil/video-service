import { MessageType } from './Message.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { ChatFromDb } from '../types';

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

  constructor({ chat, currentUserId }: ChatTypeConstructorParams) {
    this.id = chat.id;
    this.messages = chat.messages.map(
      (message) => new MessageType({ message, currentUserId })
    );
  }
}
