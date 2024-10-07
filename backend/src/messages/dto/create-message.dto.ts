import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMessageDto {
  @Field(() => Int)
  @IsNumber()
  userToId: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;
}
