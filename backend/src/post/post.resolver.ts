import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './types/post.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDetails } from './types/post-details.type';
import { SuccessMessageType } from '../common/types/SuccessMessage.type';
import { User } from '../decorators/User.decorator';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';
import { GetPostsDto } from './dto/GetPosts.dto';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => PostType)
  async createPost(
    @User() user: TokenUserDto,
    @Args('createPostInput', { type: () => CreatePostDto })
    createPostDto: CreatePostDto
  ) {
    return this.postService.createPost(user.sub, createPostDto);
  }

  @Query(() => PostDetails)
  async getPostById(
    @Args('id', { type: () => Int }) id: number,
    @User() user: TokenUserDto
  ): Promise<PostDetails> {
    return this.postService.getPostById(id, user.sub);
  }

  @Query(() => [PostType])
  async getPosts(
    @Args('getPostInput', { type: () => GetPostsDto }) getPostsDto: GetPostsDto,
    @User() user: TokenUserDto
  ): Promise<PostType[]> {
    return this.postService.getPosts({
      dto: getPostsDto,
      currentUserId: user.sub
    });
  }

  @Mutation(() => SuccessMessageType)
  async deletePost(
    @Context() context: { req: Request },
    @Args('id', { type: () => Int }) id: number
  ): Promise<SuccessMessageType> {
    return this.postService.deletePost(id, context.req.user.sub);
  }

  @Query(() => [PostType])
  async getFavoriteUserPosts(
    @Args('userId', { type: () => Int }) userId: number,
    @Context() context: { req: Request }
  ): Promise<PostType[]> {
    return this.postService.getFavoriteUserPosts(userId, context.req.user.sub);
  }
}
