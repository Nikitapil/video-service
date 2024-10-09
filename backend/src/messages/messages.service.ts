import { Injectable } from '@nestjs/common';
import { GetChatParams, ICreateMessageParams } from './types';
import { PrismaService } from '../prisma/prisma.service';
import { getSafeUserSelectFull } from '../common/db-selects/safe-user-select';
import { MessageType } from './types/Message.type';
import { ChatListItemType } from './types/ChatListItem.type';
import { getMessageInclude } from './db-selects';
import { ChatType } from './types/Chat.type';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage({
    dto,
    authorId
  }: ICreateMessageParams): Promise<MessageType> {
    let chat = await this.prismaService.chat.findFirst({
      where: {
        chatUser: {
          every: {
            userId: {
              in: [authorId, dto.userToId]
            }
          }
        }
      }
    });

    if (!chat) {
      chat = await this.prismaService.chat.create({
        data: {
          chatUser: {
            createMany: {
              data: [{ userId: authorId }, { userId: dto.userToId }]
            }
          }
        }
      });
    }

    const message = await this.prismaService.message.create({
      data: {
        authorId,
        text: dto.text,
        chatId: chat.id
      },
      include: getMessageInclude(authorId)
    });

    return new MessageType({ message, currentUserId: authorId });
  }

  async getChatList(userId: number) {
    const chats = await this.prismaService.chat.findMany({
      where: {
        chatUser: {
          some: {
            userId: userId
          }
        }
      },
      include: {
        messages: {
          include: getMessageInclude(userId),
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        },
        chatUser: {
          select: {
            user: {
              select: getSafeUserSelectFull(userId)
            }
          }
        },
        _count: {
          select: {
            messages: {
              where: { isOpened: false }
            }
          }
        }
      }
    });

    return chats.map(
      (chat) =>
        new ChatListItemType({ chatFromDb: chat, currentUserId: userId })
    );
  }

  async getChat({ currentUserId, chatId }: GetChatParams) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          include: getMessageInclude(currentUserId)
        }
      }
    });

    return new ChatType({ chat, currentUserId: currentUserId });
  }
}
