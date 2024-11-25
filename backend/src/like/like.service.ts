import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleLikeDto } from './dto/toggle-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async toggleLike(currentUserId: number, data: ToggleLikeDto) {
    const dbData = { userId: currentUserId, postId: data.postId };

    const like = await this.prismaService.like.findUnique({
      where: { userId_postId: dbData }
    });

    if (like) {
      await this.prismaService.like.delete({
        where: { userId_postId: dbData }
      });

      return { isLiked: false };
    }

    await this.prismaService.like.create({ data: dbData });

    return { isLiked: true };
  }
}
