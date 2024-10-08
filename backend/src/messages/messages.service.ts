import { Injectable } from '@nestjs/common';
import { ICreateMessageParams } from './types';
import { PrismaService } from '../prisma/prisma.service';
import { getSafeUserSelectFull } from '../common/db-selects/safe-user-select';
import { MessageType } from './types/Message.type';
import { ChatListItemType } from './types/ChatListItem.type';

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
      include: {
        author: {
          select: getSafeUserSelectFull(authorId)
        }
      }
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
          include: {
            author: {
              select: getSafeUserSelectFull(userId)
            }
          },
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
}
