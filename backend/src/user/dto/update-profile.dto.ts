import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProfileDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  fullname?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}
