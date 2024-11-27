import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { IsFile } from '../../common/validators/IsFile';

@InputType()
export class CreatePostDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsFile({ mime: ['video/mp4'] })
  video: FileUpload;

  @Field(() => String, { nullable: true })
  @IsString()
  tags?: string;
}
