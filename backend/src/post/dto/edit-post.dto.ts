import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class EditPostDto {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  postId: number;

  @Field(() => String)
  @IsString()
  text: string;

  @Field(() => String)
  @IsString()
  tags: string;
}
