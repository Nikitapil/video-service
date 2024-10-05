import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
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

  @Field(() => Boolean, { nullable: true })
  isLiked?: boolean;

  @Field(() => Number, { nullable: true })
  likesCount?: number;

  @Field(() => [String])
  tags: string[];

  constructor(postFromDb: PostFromDb, currentUserId: number) {
    this.id = postFromDb.id;
    this.text = postFromDb.text;
    this.createdAt = postFromDb.createdAt;
    this.video = postFromDb.video;
    this.isLiked = !!postFromDb.likes?.length;
    this.user = new User(postFromDb.user, currentUserId);
    this.tags = postFromDb.tags;
    this.likesCount = postFromDb._count?.likes || 0;
  }
}
