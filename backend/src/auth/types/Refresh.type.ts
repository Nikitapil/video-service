import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type';

@ObjectType()
export class RefreshType {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
