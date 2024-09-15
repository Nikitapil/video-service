import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class ToggleLikeDto {
  @Field(() => Int)
  @IsInt()
  postId: number;

  @Field(() => Int)
  @IsInt()
  userId: number;
}
