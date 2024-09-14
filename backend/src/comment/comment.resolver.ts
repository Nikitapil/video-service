import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { CommentType } from './types/comment.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentType])
  getCommentsByPostId(@Args('postId') postId: number): Promise<CommentType[]> {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => CommentType)
  createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() context: { req: Request }
  ): Promise<CommentType> {
    return this.commentService.createComment({
      postId,
      text,
      userId: context.req.user.sub
    });
  }
}
