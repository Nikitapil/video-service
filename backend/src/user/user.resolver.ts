import { Resolver, Mutation, Args, Context, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from '../auth/dto/login.dto';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQlErrorFilter } from '../filters/custom-exception.filter';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { ToggleFollowType } from './types/toggle-follow.type';
import { User } from './types/user.type';
import { UpdateProfileInputDto } from './dto/update-profile-input.dto';
import { UserProfileType } from './types/user-profile.type';
import { REFRESH_TOKEN_COOKIE } from '../auth/constants';
import { AuthResponse } from '../auth/types/AuthResponse.type';

@UseFilters(GraphQlErrorFilter)
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image?: FileUpload
  ): Promise<AuthResponse> {
    let imageUrl;
    if (image) {
      // TODO переделать на единый сервис по работе с файлами и вызывать это уже внутри других сервисов а не в контроллере
      imageUrl = await this.userService.storeImageAndGetUrl(image);
    }

    const { refreshToken, accessToken, user } = await this.authService.register(
      registerDto,
      imageUrl
    );

    context.res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true
    });

    return { user, accessToken };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response }
  ): Promise<AuthResponse> {
    const { refreshToken, accessToken, user } =
      await this.authService.login(loginDto);
    context.res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true
    });
    return { accessToken, user };
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

    const { refreshToken, accessToken, user } =
      await this.authService.refreshToken(token);

    context.res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true
    });
    return { accessToken, user };
  }

  @UseGuards(GraphQLAuthGuard)
  @Query(() => [User])
  getUsers(
    @Context() context: { req: Request },
    @Args('getUsersInput', { type: () => GetUsersDto, nullable: true })
    getUsersDto?: GetUsersDto
  ) {
    return this.userService.getUsers(context.req.user.sub, getUsersDto);
  }

  @UseGuards(GraphQLAuthGuard)
  @Query(() => UserProfileType)
  getUserProfile(
    @Context() context: { req: Request },
    @Args('userId', { type: () => Int }) userId?: number
  ): Promise<UserProfileType> {
    return this.userService.getUserProfile(userId, context.req.user.sub);
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Context() context: { req: Request },
    @Args('updateProfileInput', { type: () => UpdateProfileInputDto })
    updateProfileInput?: UpdateProfileInputDto,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image?: FileUpload
  ) {
    let imageUrl;
    if (image) {
      imageUrl = await this.userService.storeImageAndGetUrl(image);
    }

    return this.userService.updateProfile(context.req.user.sub, {
      ...updateProfileInput,
      image: imageUrl
    });
  }

  @UseGuards(GraphQLAuthGuard)
  @Mutation(() => ToggleFollowType)
  async toggleUserFollow(
    @Context() context: { req: Request },
    @Args('userToFollowId', { type: () => Int })
    userToFollowId?: number
  ): Promise<ToggleFollowType> {
    return this.userService.toggleFollowUser({
      userToFollowId,
      currentUserId: context.req.user.sub
    });
  }
}
