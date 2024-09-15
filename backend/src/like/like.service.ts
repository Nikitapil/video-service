import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleLikeDto } from './dto/toggle-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}
  // TODO переделать чтобы был единый метод который либо добавляет либо удаляет лайк
  async likePost(data: ToggleLikeDto) {
    return this.prismaService.like.create({ data });
  }

  async unlikePost(data: ToggleLikeDto) {
    return this.prismaService.like.delete({
      where: { userId_postId: data }
    });
  }
}
