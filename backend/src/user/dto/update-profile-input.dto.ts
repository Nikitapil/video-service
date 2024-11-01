import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInputDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullname?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsOptional()
  email?: string;
}
