import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { ToggleLike } from './types/toggle-like.type';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => ToggleLike)
  toggleLikePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Context() context: { req: Request }
  ): Promise<ToggleLike> {
    return this.likeService.toggleLike({
      postId,
      userId: context.req.user.sub
    });
  }
}
