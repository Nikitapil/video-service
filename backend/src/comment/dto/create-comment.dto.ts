import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentDto {
  @Field(() => Int)
  @IsInt()
  postId: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;
}
