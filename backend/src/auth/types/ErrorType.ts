import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorType {
  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  code?: string;
}
