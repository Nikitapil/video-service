import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostType } from './post.type';

@ObjectType()
export class PostDetails extends PostType {
  @Field(() => [Int], { nullable: true })
  otherPostIds?: number[];
}
