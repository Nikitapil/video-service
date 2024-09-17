import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { LikeType } from '../../like/types/like.type';

@ObjectType()
export class PostType {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => String)
  video: string;

  @Field(() => User)
  user?: User;

  @Field(() => [LikeType], { nullable: true })
  likes?: LikeType[];
}
