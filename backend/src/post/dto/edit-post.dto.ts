import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditPostDto {
  @Field()
  postId: number;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => String, { nullable: true })
  tags?: string;
}
