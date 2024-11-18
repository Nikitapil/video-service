import { PrismaService } from '../../prisma/prisma.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenUserDto } from '../dto/TokenUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET
    });
  }

  async validate(payload: TokenUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    });
    if (user) {
      return payload;
    }
    return user;
  }
}
