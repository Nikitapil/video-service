import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostDto {
  //TODO get this not from dto but from auth
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => String, { nullable: true })
  @IsString()
  video: string;

  @Field(() => String, { nullable: true })
  @IsString()
  tags?: string;
}
