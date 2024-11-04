import { User } from './user.type';
import { UserProfileFromDb } from '../types';
import { Field, Int, ObjectType } from '@nestjs/graphql';
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

  @Field(() => Int)
  followersCount: number;

  @Field(() => Int)
  followingCount: number;

  constructor({
    profile,
    currentUserId
  }: UserProfileTypeConstructorParameters) {
    super(profile, currentUserId);

    this.posts = profile.posts.map((post) => new PostType(post, currentUserId));
    this.isMyProfile = profile.id === currentUserId;
    this.followersCount = profile._count.followedBy;
    this.followingCount = profile._count.following;
  }
}
