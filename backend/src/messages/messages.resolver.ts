import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { MessageType } from './types/Message.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { MessagesService } from './messages.service';
import { SocketService } from '../socket/socket.service';
import { getChatRoomId } from './helpers/common';

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
}
