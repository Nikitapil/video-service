import {
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDetails } from './types/post-details.type';
import { PostType } from './types/post.type';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';
import { getPostInclude } from '../common/db-selects/post-selects';
import { GetPostsParams, PostFromDb } from './types';
import { FilesService } from '../files/files.service';
import { prepareHashTagsArray } from './utils';
import { EditPostDto } from './dto/edit-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly filesService: FilesService
  ) {}

  private mapPosts(posts: PostFromDb[], currentUserId: number) {
    return posts.map((post) => new PostType(post, currentUserId));
  }

  async createPost(currentUserId: number, data: CreatePostDto): Promise<Post> {
    const videoPath = await this.filesService.saveFile(data.video);

    const postData = {
      userId: currentUserId,
      text: data.text,
      video: videoPath,
      tags: prepareHashTagsArray(data.tags || '')
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

  async getPosts({ dto, currentUserId }: GetPostsParams): Promise<PostType[]> {
    const where: Prisma.PostWhereInput = {};

    if (dto.search) {
      where.tags = {
        has: dto.search
      };
    }

    if (!dto.search) {
      where.user = {
        followedBy: {
          some: {
            followedById: currentUserId
          }
        }
      };
    }

    const posts = await this.prismaService.post.findMany({
      where,
      skip: dto.skip,
      take: dto.take,
      include: getPostInclude(currentUserId),
      orderBy: { createdAt: 'desc' }
    });
    return this.mapPosts(posts, currentUserId);
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
    return this.mapPosts(posts, currentUserId);
  }

  async editPost(currentUserId: number, dto: EditPostDto) {
    const post = await this.prismaService.post.findUnique({
      where: { id: dto.postId },
      include: getPostInclude(currentUserId)
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const postType = new PostType(post, currentUserId);

    if (!postType.canEdit) {
      throw new NotAcceptableException();
    }

    const editedPost = await this.prismaService.post.update({
      where: { id: dto.postId },
      data: {
        tags: prepareHashTagsArray(dto.tags || ''),
        text: dto.text
      },
      include: getPostInclude(currentUserId)
    });

    return new PostType(editedPost, currentUserId);
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
      this.filesService.removeFile(post.video);

      await this.prismaService.post.delete({
        where: { id }
      });

      return new SuccessMessageType();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
