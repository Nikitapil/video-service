import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';
import { IsMatch } from '../../common/validators/MatchValidator';

@InputType()
export class RegisterDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Fullname is required.' })
  @IsString({ message: 'Fullname must be a string' })
  fullname: string;

  @Field(() => String, { nullable: true })
  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  bio?: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString({ message: 'Confirm password must be a string' })
  @IsMatch('password', { message: 'Confirm password should match password' })
  confirmPassword: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;
}
