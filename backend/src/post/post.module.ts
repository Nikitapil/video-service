import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { JwtService } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [PostService, PostResolver, JwtService]
})
export class PostModule {}
