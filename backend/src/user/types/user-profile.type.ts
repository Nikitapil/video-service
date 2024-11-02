import { User } from './user.type';
import { UserProfileFromDb } from '../types';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostType } from '../../post/types/post.type';

interface UserProfileTypeConstructorParameters {
  profile: UserProfileFromDb;
  currentUserId: number;
}

@ObjectType()
export class UserProfileType extends User {
  @Field(() => [PostType])
  posts: PostType[];

  @Field(() => Boolean)
  isMyProfile: boolean;

  constructor({
    profile,
    currentUserId
  }: UserProfileTypeConstructorParameters) {
    super(profile, currentUserId);

    this.posts = profile.posts.map((post) => new PostType(post, currentUserId));
    this.isMyProfile = profile.id === currentUserId;
  }
}
