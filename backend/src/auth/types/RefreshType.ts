import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@ObjectType()
export class RefreshType {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
