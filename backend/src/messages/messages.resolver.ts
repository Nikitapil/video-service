import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageType } from './types/Message.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { MessagesService } from './messages.service';
import { SocketService } from '../socket/socket.service';
import { getChatRoomId } from './helpers/common';
import { ChatListItemType } from './types/ChatListItem.type';
import { ChatType } from './types/Chat.type';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messageService: MessagesService,
    private socketService: SocketService
  ) {}

  @Mutation(() => MessageType)
  async createMessage(
    @Args('createMesageInput', { type: () => CreateMessageDto })
    createMessageDto: CreateMessageDto,
    @Context() context: { req: Request }
  ) {
    const message = await this.messageService.createMessage({
      dto: createMessageDto,
      authorId: context.req.user.sub
    });

    this.socketService.sendMessageToRoom({
      message,
      roomId: getChatRoomId(message.chatId)
    });

    return message;
  }

  @Query(() => [ChatListItemType])
  getChatList(
    @Context() context: { req: Request }
  ): Promise<ChatListItemType[]> {
    return this.messageService.getChatList(context.req.user.sub);
  }

  @Query(() => ChatType)
  getChat(
    @Context() context: { req: Request },
    @Args('chatId', { type: () => String }) chatId: string
  ): Promise<ChatType> {
    return this.messageService.getChat({
      currentUserId: context.req.user.sub,
      chatId
    });
  }

  @Mutation(() => SuccessMessageType)
  openChatMessages(
    @Context() context: { req: Request },
    @Args('chatId', { type: () => String }) chatId: string
  ): Promise<SuccessMessageType> {
    return this.messageService.openChatMessages({
      currentUserId: context.req.user.sub,
      chatId
    });
  }
}
