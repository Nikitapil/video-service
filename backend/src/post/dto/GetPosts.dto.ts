import { PaginationDto } from '../../common/dto/pagination.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetPostsDto extends PaginationDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  search: string;
}
