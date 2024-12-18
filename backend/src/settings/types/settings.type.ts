import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SettingsType {
  @Field(() => Number)
  unreadMessagesCount: number;
}
