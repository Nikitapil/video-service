import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class CommentType {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => String)
  text: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
