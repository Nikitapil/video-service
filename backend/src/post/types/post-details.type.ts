import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostType } from './post.type';
import { PostFromDb } from '../types';

interface PostDetailsConstructorParams {
  post: PostFromDb;
  postIds: number[];
  currentUserId: number;
}

@ObjectType()
export class PostDetails extends PostType {
  @Field(() => [Int], { nullable: true })
  otherPostIds?: number[];

  constructor({ post, postIds, currentUserId }: PostDetailsConstructorParams) {
    super(post, currentUserId);
    this.otherPostIds = postIds;
  }
}
