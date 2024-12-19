import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';
import { PostFromDb } from '../types';
import * as process from 'node:process';

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

  @Field(() => Boolean)
  canDelete: boolean;

  @Field(() => Boolean)
  canEdit: boolean;

  @Field(() => Number, { nullable: true })
  likesCount?: number;

  @Field(() => Number, { nullable: true })
  commentsCount?: number;

  @Field(() => [String])
  tags: string[];

  constructor(postFromDb: PostFromDb, currentUserId: number) {
    const isUserEqual = postFromDb.user.id === currentUserId;

    this.id = postFromDb.id;
    this.text = postFromDb.text;
    this.createdAt = postFromDb.createdAt;
    this.video = process.env.APP_URL + postFromDb.video;
    this.isLiked = !!postFromDb.likes?.length;
    this.user = new User(postFromDb.user, currentUserId);
    this.tags = postFromDb.tags;
    this.likesCount = postFromDb._count?.likes || 0;
    this.commentsCount = postFromDb._count?.comments || 0;
    this.canDelete = isUserEqual;
    this.canEdit = isUserEqual;
  }
}
