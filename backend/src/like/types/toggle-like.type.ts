import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ToggleLike {
  @Field(() => Boolean)
  isLiked: boolean;
}
