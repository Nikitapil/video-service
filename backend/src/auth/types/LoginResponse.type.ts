import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class LoginResponseType {
  @Field(() => User)
  user: User;
}
