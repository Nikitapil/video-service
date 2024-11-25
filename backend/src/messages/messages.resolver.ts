import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageType } from './types/Message.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { SocketService } from '../socket/socket.service';
import { getChatRoomId } from './helpers/common';
import { ChatListItemType } from './types/ChatListItem.type';
import { ChatType } from './types/Chat.type';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';
import { User } from '../decorators/User.decorator';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class MessagesResolver {
  constructor(
    private readonly messageService: MessagesService,
    private socketService: SocketService
  ) {}

  @Mutation(() => MessageType)
  async createMessage(
    @Args('CreateMesageInput', { type: () => CreateMessageDto })
    createMessageDto: CreateMessageDto,
    @User() user: TokenUserDto
  ) {
    const message = await this.messageService.createMessage({
      dto: createMessageDto,
      authorId: user.sub
    });

    this.socketService.sendMessageToRoom({
      message,
      roomId: getChatRoomId(message.chatId)
    });

    return message;
  }

  @Query(() => [ChatListItemType])
  getChatList(@User() user: TokenUserDto): Promise<ChatListItemType[]> {
    return this.messageService.getChatList(user.sub);
  }

  @Query(() => ChatType)
  getChat(
    @User() user: TokenUserDto,
    @Args('chatId', { type: () => String }) chatId: string
  ): Promise<ChatType> {
    return this.messageService.getChat({
      currentUserId: user.sub,
      chatId
    });
  }

  @Mutation(() => SuccessMessageType)
  openChatMessages(
    @User() user: TokenUserDto,
    @Args('chatId', { type: () => String }) chatId: string
  ): Promise<SuccessMessageType> {
    return this.messageService.openChatMessages({
      currentUserId: user.sub,
      chatId
    });
  }
}
