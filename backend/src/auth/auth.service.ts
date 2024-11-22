import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { safeUserSelect } from '../common/db-selects/safe-user-select';
import { TokenUserDto } from './dto/TokenUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private issueTokens(user: User) {
    const payload = { username: user.fullname, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES')
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES')
    });

    return { accessToken, refreshToken, user };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload;

    try {
      payload = this.jwtService.verify<TokenUserDto>(token, {
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

    const { accessToken, refreshToken } = this.issueTokens(userExists);

    return { accessToken, refreshToken, user: userExists };
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

  async register(registerDto: RegisterDto, image?: string) {
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

    return this.issueTokens(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        password: 'Invalid credentials'
      });
    }
    return this.issueTokens(user);
  }
}
