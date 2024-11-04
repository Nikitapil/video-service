import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDetails } from './types/post-details.type';
import { PostType } from './types/post.type';
import { unlinkSync, mkdirSync, existsSync } from 'fs';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';
import { getPostInclude } from '../common/db-selects/post-selects';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveVideo(video: {
    createReadStream: () => any;
    filename: string;
    mimetype: string;
  }): Promise<string> {
    if (!video || !['video/mp4'].includes(video.mimetype)) {
      throw new BadRequestException(
        'Invalid video file format. Only MP4 is allowed.'
      );
    }
    const videoName = `${Date.now()}${extname(video.filename)}`;
    const videoPath = `/files/${videoName}`;
    const stream = video.createReadStream();
    const outputPath = `public${videoPath}`;

    if (!existsSync('public/files')) {
      mkdirSync('public/files', { recursive: true });
    }

    const writeStream = createWriteStream(outputPath);
    stream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return videoPath;
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    const postData = {
      ...data,
      tags:
        data.tags
          ?.split(' ')
          .map((tag) => tag.replace(/[^a-zA-Z0-9]/g, ''))
          .filter((tag, index, arr) => !!tag && index === arr.indexOf(tag)) ||
        []
    };
    return this.prismaService.post.create({
      data: postData
    });
  }

  async getPostById(id: number, currentUserId: number): Promise<PostDetails> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: getPostInclude(currentUserId)
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const postIds = await this.prismaService.post.findMany({
      where: { userId: post.userId },
      select: { id: true }
    });
    return new PostDetails({
      post,
      postIds: postIds.map(({ id }) => id),
      currentUserId
    });
  }
  // TODO take parameters as object
  async getPosts(
    skip: number,
    take: number,
    currentUserId: number,
    search?: string
  ): Promise<PostType[]> {
    const where: Prisma.PostWhereInput = {};

    if (search) {
      where.tags = {
        has: search
      };
    }
    const posts = await this.prismaService.post.findMany({
      where,
      skip,
      take,
      include: getPostInclude(currentUserId),
      orderBy: { createdAt: 'desc' }
    });
    return posts.map((post) => new PostType(post, currentUserId));
  }

  async getFavoriteUserPosts(
    userId: number,
    currentUserId: number
  ): Promise<PostType[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        likes: {
          some: {
            userId
          }
        }
      },
      include: getPostInclude(currentUserId)
    });
    return posts.map((post) => new PostType(post, currentUserId));
  }

  async deletePost(id: number, userId: number): Promise<SuccessMessageType> {
    const post = await this.prismaService.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new NotAcceptableException();
    }

    try {
      unlinkSync(`public${post.video}`);

      await this.prismaService.post.delete({
        where: { id }
      });

      return new SuccessMessageType();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
