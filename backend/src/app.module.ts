import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommentModule } from './comment/comment.module';
import { MessagesModule } from './messages/messages.module';
import { SocketModule } from './socket/socket.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res })
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    MessagesModule,
    SocketModule,
    FilesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
