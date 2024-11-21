import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user: User;
}
