import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from './ErrorType';
import { User } from '../../user/types/user.type';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}
