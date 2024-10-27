import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './types/post.type';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDetails } from './types/post-details.type';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => PostType)
  async createPost(
    @Context() context: { req: Request },
    @Args({ name: 'video', type: () => GraphQLUpload }) video: FileUpload,
    @Args('text') text: string,
    @Args('tags', { type: () => String, nullable: true }) tags: string
  ) {
    const userId = context.req.user.sub;
    const videoPath = await this.postService.saveVideo(video);

    const postData: CreatePostDto = {
      text,
      video: videoPath,
      userId,
      tags
    };

    return this.postService.createPost(postData);
  }

  @Query(() => PostDetails)
  async getPostById(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: Request }
  ): Promise<PostDetails> {
    return this.postService.getPostById(id, context.req.user.sub);
  }

  @Query(() => [PostType])
  async getPosts(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 1 }) take: number,
    @Args('search', { type: () => String, nullable: true }) search: string,
    @Context() context: { req: Request }
  ): Promise<PostType[]> {
    return this.postService.getPosts(skip, take, context.req.user.sub, search);
  }

  @Mutation(() => SuccessMessageType)
  async deletePost(
    @Context() context: { req: Request },
    @Args('id', { type: () => Int }) id: number
  ): Promise<SuccessMessageType> {
    return this.postService.deletePost(id, context.req.user.sub);
  }

  @Query(() => [PostType])
  async getPostsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
    @Context() context: { req: Request }
  ): Promise<PostType[]> {
    return this.postService.getPostsByUserId(userId, context.req.user.sub);
  }
}
