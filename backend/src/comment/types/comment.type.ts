import { User } from '../../user/models/user.model';
import { PostType } from '../../post/types/post.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentType {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => PostType)
  post: PostType;

  @Field(() => String)
  text: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
