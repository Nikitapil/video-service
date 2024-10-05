import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleLikeDto } from './dto/toggle-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async toggleLike(data: ToggleLikeDto) {
    const like = await this.prismaService.like.findUnique({
      where: { userId_postId: data }
    });

    if (like) {
      await this.prismaService.like.delete({
        where: { userId_postId: data }
      });

      return { isLiked: false };
    }

    await this.prismaService.like.create({ data });

    return { isLiked: true };
  }
}
