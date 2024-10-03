import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDetails } from './types/post-details.type';
import { PostType } from './types/post.type';
import { unlinkSync, mkdirSync, existsSync } from 'fs';
import { getSafeUserSelectFull } from '../common/db-selects/safe-user-select';

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
    return this.prismaService.post.create({
      data: data
    });
  }

  async getPostById(id: number): Promise<PostDetails> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: { user: true, likes: true, comments: true }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const postIds = await this.prismaService.post.findMany({
      where: { userId: post.userId },
      select: { id: true }
    });
    return { ...post, otherPostIds: postIds.map(({ id }) => id) };
  }

  async getPosts(
    skip: number,
    take: number,
    currentUserId: number
  ): Promise<PostType[]> {
    const posts = await this.prismaService.post.findMany({
      skip,
      take,
      include: {
        user: {
          select: getSafeUserSelectFull(currentUserId)
        },
        likes: true,
        comments: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return posts.map((post) => new PostType(post, currentUserId));
  }

  async getPostsByUserId(userId: number): Promise<PostType[]> {
    return this.prismaService.post.findMany({
      where: { userId },
      include: { user: true }
    });
  }

  async deletePost(id: number, userId: number): Promise<void> {
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
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
