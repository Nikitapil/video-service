import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

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

  @Field(() => String, { nullable: true })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsOptional()
  email?: string;
}
