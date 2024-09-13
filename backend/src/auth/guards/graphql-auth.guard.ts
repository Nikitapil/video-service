import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = context.getArgByIndex(2);
    const request = gqlCtx.req;

    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET')
      });
      request.user = payload;

      return true;
    } catch (e) {
      console.log('here');
      throw new UnauthorizedException();
    }
  }

  extractTokenFromCookie(request: Request) {
    return request.cookies?.access_token;
  }
}
