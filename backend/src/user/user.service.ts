import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import * as process from 'node:process';
import { createWriteStream } from 'fs';
import { GetUsersDto } from './dto/get-users.dto';
import { safeUserSelect } from '../common/db-selects/safe-user-select';
import { ToggleUserFollowParams } from './types';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // TODO filter private user fields and not return posts
  getUsers(currentUserId: number, dto?: GetUsersDto) {
    const { search } = dto || {};
    return this.prismaService.user.findMany({
      where: {
        fullname: {
          contains: search || '',
          mode: 'insensitive'
        },
        id: {
          not: currentUserId
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: dto.take,
      skip: dto.skip,
      select: safeUserSelect
    });
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    if (data.email) {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException({ email: 'Email already in use' });
      }
    }

    return this.prismaService.user.update({
      where: { id: userId },
      data
    });
  }

  async storeImageAndGetUrl(file: FileUpload) {
    const { createReadStream, filename } = file;

    const uniqueFilename = `${uuidv4()}_${filename}`;

    const imagePath = join(process.cwd(), 'public', uniqueFilename);

    const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;

    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    await new Promise((resolve, reject) => {
      readStream.on('end', resolve);
      readStream.on('error', reject);
    });

    return imageUrl;
  }

  async toggleFollowUser({
    currentUserId,
    userToFollowId
  }: ToggleUserFollowParams) {
    const userToFollow = await this.prismaService.user.findUnique({
      where: { id: userToFollowId },
      include: {
        following: true,
        followedBy: true
      }
    });

    console.log(userToFollow);

    if (!userToFollow) {
      throw new NotFoundException('User does not exist');
    }

    if (userToFollow.followedBy.length) {
      await this.prismaService.follows.delete({
        where: {
          followingId_followedById: {
            followedById: currentUserId,
            followingId: userToFollowId
          }
        }
      });
      return { isFollowed: false };
    }

    await this.prismaService.follows.create({
      data: {
        followedById: currentUserId,
        followingId: userToFollowId
      }
    });

    return { isFollowed: true };
  }
}
