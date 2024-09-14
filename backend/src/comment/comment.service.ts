import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentType } from './types/comment.type';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentsByPostId(postId: number): Promise<CommentType[]> {
    return this.prismaService.comment.findMany({
      where: {
        postId
      },
      include: {
        user: true,
        post: true
      }
    });
  }

  async createComment(data: CreateCommentDto): Promise<CommentType> {
    // TODO проверка на существование поста
    return this.prismaService.comment.create({
      data,
      include: {
        user: true,
        post: true
      }
    });
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: commentId
      }
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }

    if (comment.userId !== userId) {
      throw new NotAcceptableException();
    }

    await this.prismaService.comment.delete({
      where: {
        id: commentId
      }
    });
  }
}
