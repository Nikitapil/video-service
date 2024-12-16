import { Resolver, Mutation, Args, Context, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from '../auth/dto/login.dto';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQlErrorFilter } from '../filters/custom-exception.filter';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { ToggleFollowType } from './types/toggle-follow.type';
import { User } from './types/user.type';
import { User as UserDecorator } from '../decorators/User.decorator';
import { UserProfileType } from './types/user-profile.type';
import { REFRESH_TOKEN_COOKIE } from '../auth/constants';
import { AuthResponse } from '../auth/types/AuthResponse.type';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserAuthValues } from './types';
import { TokenUserDto } from '../auth/dto/TokenUser.dto';

@UseFilters(GraphQlErrorFilter)
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  private async getUserAuthData(
    serviceMethod: () => Promise<UserAuthValues>,
    res: Response
  ) {
    const { accessToken, refreshToken, user } = await serviceMethod();

    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true
    });

    return { accessToken, user };
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<AuthResponse> {
    return this.getUserAuthData(
      () => this.authService.register(registerDto),
      context.res
    );
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response }
  ): Promise<AuthResponse> {
    return this.getUserAuthData(
      () => this.authService.login(loginDto),
      context.res
    );
  }

  @Mutation(() => String)
  logout(@Context() context: { res: Response }): string {
    context.res.clearCookie('refresh_token');
    return 'Successfully logged out';
  }

  @Mutation(() => AuthResponse)
  async refreshToken(
    @Context() context: { res: Response; req: Request }
  ): Promise<AuthResponse> {
    const token = context.req.cookies[REFRESH_TOKEN_COOKIE];

    return this.getUserAuthData(
      () => this.authService.refreshToken(token),
      context.res
    );
  }

  @UseGuards(GraphQLAuthGuard)
  @Query(() => [User])
  getUsers(
    @UserDecorator() user: TokenUserDto,
    @Args('getUsersInput', { type: () => GetUsersDto, nullable: true })
    getUsersDto?: GetUsersDto
  ) {
    return this.userService.getUsers(user.sub, getUsersDto);
  }

  @UseGuards(GraphQLAuthGuard)
  @Query(() => UserProfileType)
  getUserProfile(
    @UserDecorator() user: TokenUserDto,
    @Args('userId', { type: () => Int }) userId: number
  ): Promise<UserProfileType> {
    return this.userService.getUserProfile(userId, user.sub);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserDecorator() user: TokenUserDto,
    @Args('updateProfileInput', { type: () => UpdateProfileDto })
    updateProfileDto: UpdateProfileDto
  ) {
    return this.userService.updateProfile(user.sub, updateProfileDto);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => ToggleFollowType)
  async toggleUserFollow(
    @UserDecorator() user: TokenUserDto,
    @Args('userToFollowId', { type: () => Int })
    userToFollowId: number
  ): Promise<ToggleFollowType> {
    return this.userService.toggleFollowUser({
      userToFollowId,
      currentUserId: user.sub
    });
  }
}
