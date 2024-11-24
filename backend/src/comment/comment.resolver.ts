import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { CommentType } from './types/comment.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';

@UseGuards(GraphQLAuthGuard)
@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentType])
  getCommentsByPostId(
    @Args('postId', { type: () => Int }) postId: number,
    @Context() context: { req: Request }
  ): Promise<CommentType[]> {
    return this.commentService.getCommentsByPostId(
      postId,
      context.req.user.sub
    );
  }

  @Mutation(() => CommentType)
  createComment(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('text') text: string,
    @Context() context: { req: Request }
  ): Promise<CommentType> {
    return this.commentService.createComment(context.req.user.sub, {
      postId,
      text
    });
  }

  @Mutation(() => String, { nullable: true })
  deleteComment(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: Request }
  ): Promise<void> {
    return this.commentService.deleteComment(id, context.req.user.sub);
  }
}
