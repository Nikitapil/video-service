import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@InputType()
export class GetUsersDto extends PaginationDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userFollowers?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userFollowTo?: number;
}
