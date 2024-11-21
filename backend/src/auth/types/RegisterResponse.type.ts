import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class RegisterResponseType {
  @Field(() => User)
  user: User;
}
