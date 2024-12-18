import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSettings(userId: number) {
    const unreadMessagesCount = await this.prismaService.message.count({
      where: {
        authorId: {
          not: userId
        },
        chat: {
          chatUser: {
            some: {
              userId: userId
            }
          }
        },
        isOpened: false
      }
    });

    return { unreadMessagesCount };
  }
}
