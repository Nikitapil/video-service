import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  take?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  skip?: number;
}
