import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO filter private user fields and not return posts
  getUsers() {
    return this.prismaService.user.findMany({
      include: {
        posts: true
      }
    });
  }
}
