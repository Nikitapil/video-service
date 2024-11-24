import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentType } from './types/comment.type';
import { getCommentInclude } from '../common/db-selects/comment-selects';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentsByPostId(
    postId: number,
    currentUserId: number
  ): Promise<CommentType[]> {
    const comments = await this.prismaService.comment.findMany({
      where: {
        postId
      },
      include: getCommentInclude(currentUserId)
    });
    return comments.map(
      (comment) => new CommentType({ comment, currentUserId })
    );
  }

  async createComment(
    currentUserId: number,
    data: CreateCommentDto
  ): Promise<CommentType> {
    const post = await this.prismaService.post.findUnique({
      where: { id: data.postId }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prismaService.comment.create({
      data: {
        postId: data.postId,
        text: data.text,
        userId: currentUserId
      },
      include: getCommentInclude(currentUserId)
    });

    return new CommentType({ comment, currentUserId: currentUserId });
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
