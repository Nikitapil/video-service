import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeType } from './types/like.type';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => LikeType)
  likePost(
    @Args('postId') postId: number,
    @Context() context: { req: Request }
  ): Promise<LikeType> {
    return this.likeService.likePost({
      postId,
      userId: context.req.user.sub
    });
  }

  @Mutation(() => String)
  unlikePost(
    @Args('postId') postId: number,
    @Context() context: { req: Request }
  ) {
    return this.likeService.unlikePost({
      postId,
      userId: context.req.user.sub
    });
  }
}
