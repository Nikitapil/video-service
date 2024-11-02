import { Resolver, Mutation, Args, Context, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { RegisterResponse } from '../auth/types/RegisterResponse';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request, Response } from 'express';
import { LoginDto } from '../auth/dto/login.dto';
import { LoginResponse } from '../auth/types/LoginResponse';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GraphQlErrorFilter } from '../filters/custom-exception.filter';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { GraphQLAuthGuard } from '../auth/guards/graphql-auth.guard';
import { RefreshType } from '../auth/types/RefreshType';
import { GetUsersDto } from './dto/get-users.dto';
import { ToggleFollowType } from './types/toggle-follow.type';
import { User } from './types/user.type';
import { UpdateProfileInputDto } from './dto/update-profile-input.dto';
import { UserProfileType } from './types/user-profile.type';

@UseFilters(GraphQlErrorFilter)
@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Mutation(() => RegisterResponse)
  register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response }
  ): Promise<RegisterResponse> {
    return this.authService.register(registerDto, context.res);
  }

  @Mutation(() => LoginResponse)
  login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response }
  ): Promise<LoginResponse> {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  logout(@Context() context: { res: Response }): Promise<string> {
    return this.authService.logout(context.res);
  }

  @Mutation(() => RefreshType)
  refreshToken(
    @Context() context: { res: Response; req: Request }
  ): Promise<RefreshType> {
    return this.authService.refreshToken(context.req, context.res);
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
