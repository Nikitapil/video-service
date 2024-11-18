import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { safeUserSelect } from '../common/db-selects/safe-user-select';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET')
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const userExists = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
      select: safeUserSelect
    });

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;

    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET')
      }
    );

    res.cookie('access_token', accessToken, { httpOnly: true });

    return { accessToken, user: userExists };
  }

  private async issueTokens(user: User, response: Response) {
    const payload = { username: user.fullname, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: '150sec'
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '7d'
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });

    return { user };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email }
    });

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async register(registerDto: RegisterDto, response: Response, image?: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new BadRequestException({
        email: 'Email Already in use'
      });
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email: registerDto.email,
        fullname: registerDto.fullname,
        password: hashedPassword,
        bio: registerDto.bio,
        image
      },
      select: safeUserSelect
    });

    return this.issueTokens(user, response);
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        invalidCredentials: 'Invalid credentials'
      });
    }
    return this.issueTokens(user, response);
  }

  async logout(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return 'Successfully logged out';
  }
}
