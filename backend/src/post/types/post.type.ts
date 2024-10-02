import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { LikeType } from '../../like/types/like.type';
import { User } from '../../user/types/user.type';
import { PostFromDb } from '../types';

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

  constructor(postFromDb: PostFromDb) {
    this.id = postFromDb.id;
    this.text = postFromDb.text;
    this.createdAt = postFromDb.createdAt;
    this.video = postFromDb.video;
    this.likes = postFromDb.likes;
    this.user = new User(postFromDb.user);
  }
}
