import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [UserService, UserResolver, AuthService, JwtService]
})
export class UserModule {}
