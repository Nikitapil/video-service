import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PostService, PostResolver, JwtService]
})
export class PostModule {}
