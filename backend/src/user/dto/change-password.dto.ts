import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsMatch } from '../../common/validators/MatchValidator';

@InputType()
export class ChangePasswordDto {
  @Field(() => String)
  @IsString()
  oldPassword: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  newPassword: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString({ message: 'Confirm password must be a string' })
  @IsMatch('newPassword', { message: 'Confirm password should match password' })
  confirmPassword: string;
}
