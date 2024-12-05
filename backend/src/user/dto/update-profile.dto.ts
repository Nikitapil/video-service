import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { IsFile } from '../../common/validators/IsFile';

@InputType()
export class UpdateProfileDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  fullname?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsFile({ mime: ['image/jpeg', 'image/png', 'image/jpg'] })
  @IsOptional()
  image?: FileUpload;

  @Field(() => String, { nullable: true })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsOptional()
  email?: string;
}
