import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ToggleFollowType {
  @Field(() => Boolean)
  isFollowed: boolean;
}
