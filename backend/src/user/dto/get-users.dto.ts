import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@InputType()
export class GetUsersDto extends PaginationDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search?: string;
}
