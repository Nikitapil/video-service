import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  take?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  skip?: number;
}
