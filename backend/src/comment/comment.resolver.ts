import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentType } from './types/comment.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { User } from '../decorators/User.decorator';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentType])
  getCommentsByPostId(
    @Args('postId', { type: () => Int }) postId: number,
    @User() user: TokenUserDto
  ): Promise<CommentType[]> {
    return this.commentService.getCommentsByPostId(postId, user.sub);
  }

  @Mutation(() => CommentType)
  createComment(
    @Args('createCommentInput', { type: () => CreateCommentDto })
    createCommentDto: CreateCommentDto,
    @User() user: TokenUserDto
  ): Promise<CommentType> {
    return this.commentService.createComment(user.sub, createCommentDto);
  }

  @Mutation(() => String, { nullable: true })
  deleteComment(
    @Args('id', { type: () => Int }) id: number,
    @User() user: TokenUserDto
  ): Promise<void> {
    return this.commentService.deleteComment(id, user.sub);
  }
}
