import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessMessageType {
  @Field(() => String)
  message: string = 'success';
}
