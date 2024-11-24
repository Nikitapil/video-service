import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { ToggleLike } from './types/toggle-like.type';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';
import { User } from '../decorators/User.decorator';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class LikeResolver {
  constructor(private likeService: LikeService) {}

  @Mutation(() => ToggleLike)
  toggleLikePost(
    @Args('postId', { type: () => Int }) postId: number,
    @User() user: TokenUserDto
  ): Promise<ToggleLike> {
    return this.likeService.toggleLike(user.sub, {
      postId
    });
  }
}
