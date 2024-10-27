import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';
import { CommentFromDb } from '../types';

interface CommentTypeConstructorParameters {
  comment: CommentFromDb;
  currentUserId: number;
}

@ObjectType()
export class CommentType {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => String)
  text: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => Boolean)
  canDelete: boolean;

  constructor({ comment, currentUserId }: CommentTypeConstructorParameters) {
    this.id = comment.id;
    this.user = new User(comment.user, currentUserId);
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.canDelete = comment.user.id === currentUserId;
  }
}
