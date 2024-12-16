import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { getSafeUserSelectFull } from '../common/db-selects/safe-user-select';
import { ToggleUserFollowParams } from './types';
import { getPostInclude } from '../common/db-selects/post-selects';
import { UserProfileType } from './types/user-profile.type';
import { Prisma } from '@prisma/client';
import { User } from './types/user.type';
import { FilesService } from '../files/files.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService
  ) {}

  async getUsers(currentUserId: number, dto?: GetUsersDto) {
    const { search } = dto || {};

    const userFollowId = dto?.userFollowers || dto?.userFollowTo;

    const where: Prisma.UserWhereInput = {
      fullname: {
        contains: search || '',
        mode: 'insensitive'
      },
      id: {
        not: userFollowId || currentUserId
      }
    };

    if (dto?.userFollowers) {
      where.following = {
        some: {
          followingId: dto.userFollowers
        }
      };
    } else if (dto?.userFollowTo) {
      where.followedBy = {
        some: {
          followedById: dto.userFollowTo
        }
      };
    }

    const users = await this.prismaService.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: dto?.take,
      skip: dto?.skip,
      select: getSafeUserSelectFull(currentUserId)
    });

    return users.map((user) => new User(user, currentUserId));
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    const { image, ...restData } = data;

    let imageUrl;
    if (image) {
      imageUrl = await this.filesService.saveFile(image);
    }

    if (data.email) {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException({ email: 'Email already in use' });
      }
    }

    const saveData: Prisma.UserUpdateInput = {
      ...restData
    };

    if (imageUrl) {
      saveData.image = imageUrl;
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: saveData
    });

    return new User(updatedUser, userId);
  }

  async toggleFollowUser({
    currentUserId,
    userToFollowId
  }: ToggleUserFollowParams) {
    const userToFollow = await this.prismaService.user.findUnique({
      where: { id: userToFollowId },
      include: {
        followedBy: {
          where: {
            followedById: currentUserId
          }
        }
      }
    });

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

  async getUserProfile(userId: number, currentUserId: number) {
    const profile = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        ...getSafeUserSelectFull(currentUserId),
        posts: {
          include: getPostInclude(currentUserId)
        },
        _count: {
          select: {
            following: true,
            followedBy: true
          }
        }
      }
    });

    if (!profile) {
      throw new NotFoundException('User not found');
    }

    return new UserProfileType({ profile, currentUserId });
  }
}
