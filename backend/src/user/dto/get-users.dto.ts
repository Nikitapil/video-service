import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetUsersDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search?: string;
}
