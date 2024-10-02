import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserFromDb } from '../types';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  fullname: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean, { nullable: true })
  isFollowed?: boolean;

  constructor(userFromDb: UserFromDb) {
    this.id = userFromDb.id;
    this.fullname = userFromDb.fullname;
    this.bio = userFromDb.bio;
    this.image = userFromDb.image;
    this.email = userFromDb.email;
    this.isFollowed = !!userFromDb?.followedBy.length;
  }
}
