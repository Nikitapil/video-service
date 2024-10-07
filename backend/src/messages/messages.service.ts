import { Injectable } from '@nestjs/common';
import { ICreateMessageParams } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage({ dto, authorId }: ICreateMessageParams) {
    const chat = await this.prismaService.chat.findFirst({
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
  }
}
